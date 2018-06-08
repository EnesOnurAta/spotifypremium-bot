const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client();
var prefix = ayarlar.prefix;
message.prefix = prefix;


//Komutlar Klasöründeki .js uzantılı dosyaları komut olarak algılaması için
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

//Değişen Oynuyor Kısmı
bot.on('ready', () => {
	console.log("Yukleniyor...");
	setTimeout(function(){
	console.log("Spotify Premium hesap dagitmaya devam ediyor");
	}, 1000);
	function botStatus() {
        let status = [
            `Prefix 》${botconfig.prefix}`,
            `Teşekkürler 》${bot.guilds.size} sunucu.`,
            `Bedava Spotify Premium Hesapları.`,
            `Botun Geliştiricisi 》 Enes Onur Ata#9427`,
            `Teşekkürler 》${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı.`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})

      //Botu ekleyen sunucu olursa log verecek
       bot.on('guildCreate', guild => {
	      let channel = bot.channels.get("454511638649765888")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Katıldım 》${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
        //Botu Atanlara log verexek
	bot.on('guildDelete', guild => {
	      let channel = bot.channels.get("454511638649765888")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Ayrıldım 》 ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});

//Token
client.login(process.env.BOT_TOKEN);
