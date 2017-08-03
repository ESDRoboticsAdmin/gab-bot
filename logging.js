const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const prefix = config.prefix;
var Datastore = require('nedb')
  , db = new Datastore({ filename: './logger/log.db', autoload: true });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

// on <Message> event
client.on('message', message => {
  
  if(message.channel.type==="dm") return;
  
  if (message.guild.id === config.guild) {
    console.log(`Received from ${message.author.username}`)
    var doc = {
      //attachments: message.attachments,
      author: {
        bot: message.author.bot,
        createdAt: message.author.createdAt,
        createdTimestamp: message.author.createdTimestamp,
        discriminator: message.author.discriminator,
        displayAvatarURL: message.author.displayAvatarURL,
        id: message.author.id,
        presence: {
          game: message.author.presence.game,
          status: message.author.presence.status
        },
        tag: message.author.tag,
        username: message.author.username
      },
      //channel: message.channel,
      cleanContent: message.cleanContent,
      //client: message.client,
      content: message.content,
      createdAt: message.createdAt.toString,
      createdTimestamp: message.createdTimestamp,
      editedAt: message.editedAt,
      editedTimestamp: message.editedTimestamp,
      //edits: message.edits,
      //embeds: message.embeds,
      guild: {
        //channels:
        createdAt: message.guild.createdAt,
        createdTimestamp: message.guild.createdTimestamp,
        iconURL: message.guild.iconURL,
        id: message.guild.id,
        large: message.guild.large,
        memberCount: message.guild.memberCount,
        //members
        name: message.guild.name,
        owner: {
          bot: message.guild.owner.user.bot,
          createdAt: message.guild.owner.user.createdAt,
          createdTimestamp: message.guild.owner.user.createdTimestamp,
          discriminator: message.guild.owner.user.discriminator,
          displayAvatarURL: message.guild.owner.user.displayAvatarURL,
          id: message.guild.owner.user.id,
          presence: {
            game: message.guild.owner.presence.game,
            status: message.guild.owner.presence.status
          },
          tag: message.guild.owner.user.tag,
          username: message.guild.owner.user.username,
          nickname: message.guild.owner.nickname
        },
        ownerID: message.guild.ownerID,
        position: message.guild.position,
        presences: message.guild.presences,
        region: message.guild.region,
        roles: message.guild.roles,
        splashURL: message.guild.splashURL
      },
      id: message.id,
      pinned: message.pinned,
      //reactions: message.reactions,
      system: message.system,
      tts: message.tts,
      type: message.type,
      webhookID: message.webhookID
    };
    db.insert(doc, function (err, newDoc) {
      if(err) console.error(err);
    });
  }
});

client.login(config.token);
