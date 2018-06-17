const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// save mySQL credentials inside the server
let osFolder = process.env.HOME + '/.recipes_container';
let onlineRecepies = null;
if (!fs.existsSync(osFolder)) {
  fs.mkdirSync(osFolder);
  let initialConfig = {
    mysql_user: '',
    mysql_db: '',
    mysql_pwd: '',
  }
  fs.writeFileSync(osFolder + '/.config.json', JSON.stringify(initialConfig));
  console.log('The config folder does not exist, it has been created now. The server will exit now');
  process.exit();

} else {
  onlineRecepies = require(osFolder + '/.config.json');
}

const con = mysql.createConnection({
  host: 'localhost',
  user: onlineRecepies.mysql_user,
  password: onlineRecepies.mysql_pwd,
  database: onlineRecepies.mysql_db,
});

// Upload picts with multer
// set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 7000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).single('myFile');

// check type file
const checkFileType = (file, callback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback('Error: images only');
  }
}

// End uploading pictures

// manage request
exports.showRecipes = (req, res) => {
  con.query('select * from types_recipes;', (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.cookingCategorie = (req, res) => {
  con.query('select * from cooking_categorie;', (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.patternCategorie = (req, res) => {
  con.query('select * from pattern_categorie;', (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.cookingRecipes = (req, res) => {
  con.query('select * from cooking_recipe where cooking_categories_ID = ?;', [req.params.catId], (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.patternRecipes = (req, res) => {
  con.query('select * from pattern_recipe where pattern_categories_ID = ?;', [req.params.catId], (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.theCookingRecipe = (req, res) => {
  con.query('select * from cooking_recipe where id = ?;', [req.params.id], (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.thePatternRecipe = (req, res) => {
  con.query('select * from pattern_recipe where id = ?;', [req.params.id], (err, rows) => {
    err ? res.json({ err: `Some error happend ${err}` }) : res.json(rows);
  });
}

exports.createCookingRecipes = (req, res) => {
  console.log('createCookingRecipes');
  upload(req, res, (err) => {
    console.log('1', req.body);
    console.log('1', req.file);
    if (err) {
      throw err
    } else {
      if (req.file == undefined) {
        console.log('no file selected');
      } else {
        const filePath = `/assets/uploads/${req.file.filename}`;
        con.query('INSERT INTO cooking_recipe (name,long_name,picture,ingredients,notes,nutrition,time_baking,time_cooking,time_preparation,cooking_categories_ID,text) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [req.body.recipeName,
            req.body.recipeLongName,
            filePath,
            req.body.recipeIngr,
            req.body.recipeNotes,
            req.body.recipeNutr,
            req.body.recipeBaking,
            req.body.recipeCooking,
            req.body.recipePreparation,
            req.body.categorieFormControl,
            req.body.preparationText,
          ],
          (err, rows) => {
            err ? res.json({ err: `Some error happend ${err}` }) : res.json({ message: 'New cooking recipe inserted' });
          });
      }
    }
  })

}

exports.createPatternRecipes = (req, res) => {
  console.log('createPatternRecipes');
  upload(req, res, (err) => {
    if (err) {
      throw err
    } else {
      if (req.file == undefined) {
        console.log('no file selected');
      } else {
        const filePath = `/assets/uploads/${req.file.filename}`;
        con.query('INSERT INTO pattern_recipe (name,picture,ingredients,notes,pattern_categories_ID,text) VALUES (?,?,?,?,?,?)', [req.body.recipeName,
            filePath,
            req.body.recipeIngr,
            req.body.recipeNotes,
            req.body.categorieFormControl,
            req.body.preparationText,
          ],
          (err, rows) => {
            err ? res.json({ err: `Some error happend ${err}` }) : res.json({ message: 'New pattern recipe inserted' });
          });
      }
    }
  })
}

exports.updateCookingRecipe = (req, res) => {
  console.log('UpdatingCookingRecipes');
  console.log(req.body);
  console.log(req.file);
  upload(req, res, (err) => {
    if (err) {
      throw err
    } else {
      if (req.file == undefined) {
        console.log('no file selected');
      } else {
        const filePath = `/assets/uploads/${req.file.filename}`;
        con.query('UPDATE cooking_recipe SET name = ?, long_name = ?, picture = ?, ingredients = ?, notes = ?, nutrition = ?, time_baking = ?, time_cooking = ?, time_preparation = ?, cooking_categories_ID = ?, text = ? where id = ?', [req.body.recipeName,
          req.body.recipeLongName,
          filePath,
          req.body.recipeIngr,
          req.body.recipeNotes,
          req.body.recipeNutr,
          req.body.recipeBaking,
          req.body.recipeCooking,
          req.body.recipePreparation,
          req.body.categorieFormControl,
          req.body.preparationText,
          req.params.id,
        ], (err, rows) => {
          err ? res.json({ err: `Some error happend ${err}` }) : res.json({ message: 'Cooking recipe Edited' });
        });
      }
    }
  })
  //

}

exports.updatePatternRecipe = (req, res) => {}
