const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.login(config.token);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.bot || !msg.content.includes('!code')) return;
  if(msg.channel.type == 'dm' && msg.content.includes(config.required_password_to_join)){
    msg.reply("Mot de passe correct ! \n Vous avez maintenant accès à l'ensemble du serveur !");
    const guild = client.guilds.cache.get('777260195906060298');
    var dmUser = msg.author.id;
    var isMember = guild.members.cache.get(dmUser)
    if (isMember) {
      // then add the role
      isMember.roles.add('777303368690434078');
  } else {
      // if not true. send the user this message
      msg.reply("Vous n'etes pas sur le serveur de Action Oréades !");
  }
  }
  else{
    msg.reply("Mauvais mot de passe !");
  }
});

client.on("guildMemberAdd", (member) => {
  console.log(`Nouveau membre "${member.user.username}" a rejoint le serveur "${member.guild.name}"` );
  client.channels.cache.get('777327600980066364').send(`"${member.user.username}" has joined this server`);
  member.send('Quel est le mot de passe ?');
});