'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');

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

    // Input project title
    this.props = {
      ...(await this.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter project title',
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
            /*{
              name: 'TypeScript Node Library',
              value: 'tslib',
            },
            {
              name: 'Gam App',
              value: 'gam',
            },*/
            /*{
              name: 'Gam Go App',
              value: 'gam-app',
            },*/
            {
              name: 'Gam Go App New',
              value: 'gam-app-new',
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
      title: this.props.title,
      description: this.props.description,
    });
  }

  // eslint-disable-next-line camelcase
  _writeTemplate_gam() {
    // Replace package json
    this.fs.copyTpl(this.templatePath(`gam/package.json`), this.destinationPath('package.json'), {
      name: this.props.name,
      title: this.props.title,
      description: this.props.description,
    });

    this.fs.copyTpl(
      this.templatePath(`gam/frontend/package.json`),
      this.destinationPath('frontend/package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );

    this.fs.copyTpl(
      this.templatePath(`gam/backend/src/index.ts`),
      this.destinationPath('backend/src/index.ts'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );

    this.fs.copyTpl(
      this.templatePath(`gam/backend/package.json`),
      this.destinationPath('backend/package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
  }

  // eslint-disable-next-line camelcase
  _writeTemplate_gam_app() {
    // Replace package json
    this.fs.copyTpl(
      this.templatePath(`gam-app/package.json`),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
    this.fs.copyTpl(
      this.templatePath(`gam-app/frontend/package.json`),
      this.destinationPath('frontend/package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
    this.fs.copyTpl(this.templatePath(`gam-app/go.mod`), this.destinationPath('go.mod'), {
      name: this.props.name,
      title: this.props.title,
      description: this.props.description,
    });
    this.fs.copyTpl(this.templatePath(`gam-app/main.go`), this.destinationPath('main.go'), {
      name: this.props.name,
      title: this.props.title,
      description: this.props.description,
    });

    this.fs.copyTpl(
      this.templatePath(`gam-app/internal/app/helloworld/main.go`),
      this.destinationPath(`internal/app/helloworld/main.go`),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
  }

  // eslint-disable-next-line camelcase
  _writeTemplate_gam_app_new() {
    // Replace package json
    this.fs.copyTpl(
      this.templatePath(`gam-app-new/package.json`),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
    this.fs.copyTpl(
      this.templatePath(`gam-app-new/frontend/package.json`),
      this.destinationPath('frontend/package.json'),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
    this.fs.copyTpl(this.templatePath(`gam-app-new/go.mod`), this.destinationPath('go.mod'), {
      name: this.props.name,
      title: this.props.title,
      description: this.props.description,
    });
    this.fs.copyTpl(this.templatePath(`gam-app-new/main.go`), this.destinationPath('main.go'), {
      name: this.props.name,
      title: this.props.title,
      description: this.props.description,
    });

    this.fs.copyTpl(
      this.templatePath(`gam-app-new/internal/app/helloworld/main.go`),
      this.destinationPath(`internal/app/helloworld/main.go`),
      {
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
      },
    );
  }

  writing() {
    this.log('s', this.props.template);
    this.fs.copy(this.templatePath(`${this.props.template}/**`), this.destinationRoot(), {
      globOptions: { dot: true },
    });

    this[`_writeTemplate_${this.props.template.replace(/-/g, '_')}`]();
  }

  install() {}

  end() {
    // Git init
    this.spawnCommandSync('git', ['init']);

    // Rename
    fs.renameSync(
      this.destinationPath('internal/app/helloworld'),
      this.destinationPath('internal/app/' + this.props.name),
    );

    // Go tidy
    this.spawnCommandSync('go', ['mod', 'tidy']);

    // Add submodule
    if (this.props.template === 'gam-app') {
      this.spawnCommandSync('git', ['submodule', 'add', 'https://github.com/maldan/gam_sdk_ui'], {
        cwd: this.destinationPath('frontend/src'),
      });
    }
    if (this.props.template === 'gam-app-new') {
      this.spawnCommandSync('git', ['submodule', 'add', 'https://github.com/maldan/gam-lib-ui'], {
        cwd: this.destinationPath('frontend/src'),
      });
    }

    // Deps
    this.spawnCommandSync('pnpm', ['install', '--shamefully-hoist'], {
      cwd: this.destinationPath('frontend'),
    });
    this.spawnCommandSync('pnpm', ['build'], {
      cwd: this.destinationPath('frontend'),
    });

    // Git commit
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', 'Fix\n-- Start']);
    this.spawnCommandSync('git', ['branch', '-M', 'main']);
    this.spawnCommandSync('git', [
      'remote',
      'add',
      'origin',
      `https://github.com/maldan/${this.props.template}-${this.props.name}.git`,
    ]);
    this.spawnCommandSync('git', ['branch', 'dev']);
    this.spawnCommandSync('git', ['checkout', 'dev']);
  }
};
