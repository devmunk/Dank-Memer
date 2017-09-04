exports.run = async function (Memer, msg, args) {
    let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL;
    if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
        avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
    }
    const data = await Memer._snek
		.get('http://getame.me/api/trigger')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', avatarurl);

    if (data.status === 200) {
        await msg.channel.createMessage('', { file: data.body, name: 'triggered.gif' });
    } else {
        msg.channel.createMessage(`Error: ${data.text}`);
    }
};

exports.props = {
    name        : 'trigger',
    usage       : '{command}',
    aliases     : [],
    cooldown    : 1,
    description : ''
};