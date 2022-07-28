module.exports = {
    apps: [
      {
        name: 'greenaral.uz',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'yarn',
        args: 'start'
      }
    ]
  }