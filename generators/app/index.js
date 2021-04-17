'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the excellent ${chalk.red('generator-code')} generator!`));

    // Input project name
    this.props = {
      ...(await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter project name',
        },
      ])),
      ...this.props,
    };

    // Input project description
    this.props = {
      ...(await this.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'Enter project description',
        },
      ])),
      ...this.props,
    };

    // Create project folder
    this.destinationRoot(this.props.name);

    // Select template
    this.props = {
      ...(await this.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select Template:',
          choices: [
            {
              name: 'TypeScript Node Library',
              value: 'tslib',
            },
          ],
        },
      ])),
      ...this.props,
    };
  }

  // eslint-disable-next-line camelcase
  _writeTemplate_tslib() {
    // Replace package json
    this.fs.copyTpl(this.templatePath(`tslib/package.json`), this.destinationPath('package.json'), {
      name: this.props.name,
      description: this.props.description,
    });
  }

  writing() {
    this.log('s', this.props.template);
    this.fs.copy(this.templatePath(`${this.props.template}/**`), this.destinationRoot(), {
      globOptions: { dot: true },
    });

    this[`_writeTemplate_${this.props.template}`]();
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
    });
  }

  end() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', [
      'remote',
      'add',
      'origin',
      `https://github.com/maldan/${this.props.template}-${this.props.name}.git`,
    ]);
    this.spawnCommand('git', ['add --all']);
    this.spawnCommand('git', ['commit -m "Start"']);
  }
};
