const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async getNecessaryInformation() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message:
          'Wat is de naam van het project? Als je niks invult gebruiken we de naam van de projectmap.',
        default: this.appname // Default to current folder name
      }
    ]);
  }

  createPackageJSON() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      name: this.answers.name
    });

    this.fs.copyTpl(this.templatePath('_.npmrc'), this.destinationPath('.npmrc'));

    console.log('Created package.json file.');
  }

  initGit() {
    this.fs.copyTpl(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));

    this.spawnCommandSync('git', ['init']);

    console.log('Initialized a git repository.');
  }

  installPrettier() {
    this.fs.copyTpl(this.templatePath('_.prettierignore'), this.destinationPath('.prettierignore'));

    this.fs.copyTpl(
      this.templatePath('_.prettierrc.yaml'),
      this.destinationPath('.prettierrc.yaml')
    );

    this.npmInstall(['prettier'], { 'save-dev': true });

    console.log('Installed Prettier.js - https://github.com/prettier/prettier.');
  }

  installNodemon() {
    this.fs.copyTpl(this.templatePath('_nodemon.json'), this.destinationPath('nodemon.json'));

    this.npmInstall(['nodemon'], { 'save-dev': true });

    console.log('Installed Nodemon - https://github.com/remy/nodemon.');
  }

  installTypescript() {
    this.fs.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));

    this.fs.copyTpl(
      this.templatePath('_tsconfig.build.json'),
      this.destinationPath('tsconfig.build.json')
    );

    this.fs.copyTpl(this.templatePath('_tslint.json'), this.destinationPath('tslint.json'));

    this.fs.copyTpl(
      this.templatePath('src/types/_index.d.ts'),
      this.destinationPath('src/types/index.d.ts')
    );

    this.npmInstall(['ts-loader', 'ts-node', 'tslint', 'typescript'], { 'save-dev': true });

    console.log('Installed Typescript with TSLint - https://github.com/Microsoft/TypeScript.');
  }

  installWebpack() {
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    this.npmInstall(['webpack', 'webpack-cli', 'webpack-node-externals'], { 'save-dev': true });

    console.log('Installed Webpack - https://github.com/webpack/webpack.');
  }

  installDotenv() {
    this.fs.copyTpl(this.templatePath('_.env.example'), this.destinationPath('.env.example'));

    this.npmInstall(['dotenv']);
    this.npmInstall(['@types/dotenv', '@types/node'], { 'save-dev': true });

    console.log('Installed Dotenv - https://github.com/motdotla/dotenv.');
  }

  installExpress() {
    this.fs.copyTpl(this.templatePath('src/_server.ts'), this.destinationPath('src/server.ts'));

    this.fs.copyTpl(this.templatePath('src/_app.ts'), this.destinationPath('src/app.ts'));

    this.fs.copyTpl(
      this.templatePath('src/middlewares/_errorHandler.ts'),
      this.destinationPath('src/middlewares/errorHandler.ts')
    );

    this.fs.copyTpl(
      this.templatePath('src/middlewares/_index.ts'),
      this.destinationPath('src/middlewares/index.ts')
    );

    this.fs.copyTpl(
      this.templatePath('src/utils/_errorCatcher.ts'),
      this.destinationPath('src/utils/errorCatcher.ts')
    );

    this.fs.copyTpl(
      this.templatePath('src/utils/_index.ts'),
      this.destinationPath('src/utils/index.ts')
    );

    this.npmInstall(['express', 'boom', 'cors', 'body-parser', 'celebrate', 'helmet']);
    this.npmInstall(['@types/express', '@types/boom', '@types/cors', '@types/helmet'], {
      'save-dev': true
    });

    console.log(
      'Installed Express with cors, body-parser and helmet - https://github.com/expressjs/express.'
    );
    console.log('Installed Boom - https://github.com/hapijs/boom.');
    console.log('Installed Celebrate - https://github.com/arb/celebrate.');
  }

  installJest() {
    this.fs.copyTpl(this.templatePath('src/_app.test.ts'), this.destinationPath('src/app.test.ts'));

    this.npmInstall(
      ['jest', '@types/jest', 'supertest', '@types/supertest', 'supertest', 'ts-jest'],
      { 'save-dev': true }
    );

    console.log('Installed Jest - https://github.com/facebook/jest.');
    console.log('Installed Supertest - https://github.com/visionmedia/supertest.');
  }

  initReadme() {
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'));
    console.log('Created a README for more information!');
  }
};
