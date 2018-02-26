module.exports = class GenericCommand {
  constructor (fn, props) {
    this.fn = fn
    this.passedProps = props
  }

  async run ({ Memer, msg, args, addCD }) {
    if (this.props.missingArgs && !args[0]) {
      return this.props.missingArgs
    }
    return this.fn({ Memer, msg, args, addCD })
  }

  get props () {
    return Object.assign({
      usage: '{command}',
      cooldown: 1000,
      isNSFW: false,
      ownerOnly: false
    }, this.passedProps, {
      perms: ['sendMessages'].concat(this.passedProps.perms || [])
    })
  }
}
