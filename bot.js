const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client();
var prefix = "*";

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
	    `Teşekkürler 》${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı.`,
            `Bedava Spotify Premium Hesapları.`,
 	    `*hesapver 》Bedava hesap alabilirsiniz.`,
	    `Proje Fikir Tarihi: 7 Haziran 2018 - Botu Açma Tarihi: 8 Haziran 2018`,
	    `©2018 Bedava Spotify Premium™`,
	    `*yardım 》Yardım alabilirsiniz.`,
            `Botun Geliştiricisi 》 Enes Onur Ata#9427`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})
	
	//Komutlar Klasöründeki .js uzantılı dosyaları komut olarak algılaması için
	fs.readdir("./komutlar/", (err, files) => {
    	console.log(`Loaded ${files.length} commands.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Spotify Premium botunda bu isimde komut yok.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./komutlar/${f}`);
	console.log(`Yuklendi : ${f}`);
	bot.commands.set(props.help.name, props);
	});
	});


	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
   message.prefix = prefix;


	try {
	let commandFile = require(`./commands/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("Spotify Premium botunda bu isimde komut yok.");
	} catch (e) { console.log(e) }
	
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

        //Sunucumuza girenlere log verecek - Üye rolü verecek
        bot.on('guildMemberAdd', member => {
        bot.channels.get('439792255365021696').setName(`Toplam Kullanıcı: ${member.guild.memberCount}`)
        let humans = member.guild.members.filter(m => !m.user.bot).size;
        bot.channels.get('439793088001736725').setName(`Üye Sayısı: ${humans}`)
        let bots = member.guild.members.filter(m => m.user.bot).size;
        bot.channels.get('439793716052623361').setName(`Bot Sayısı: ${bots}`)
	const members = member.guild.memberCount;
	const channel = member.guild.channels.find('name', 'uye-log');
	if (!channel) return;

       let Role = member.guild.roles.find(`name`, "Bot");
       if(member.user.bot){
	member.addRole(Role.id)
       }else{
      let role = member.guild.roles.find(`name`, "Üye");
	member.addRole(role.id)
       }
 
	let Embed = new Discord.RichEmbed()
	.setFooter(`Üye Katıldı | Kaç Kişi Olduk = ${member.guild.memberCount}`)
	.setColor("#cde246")    
	.setAuthor(`${member.displayName} isimli üye ${member.guild.name} sunucusuna katıldı`, member.user.displayAvatarURL)
	.setTimestamp()
	channel.send(Embed);
	});
	bot.on('guildMemberRemove', member => {
    bot.channels.get('439792255365021696').setName(`Toplam Kullanıcı: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('439793088001736725').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('439793716052623361').setName(`Bot Sayısı: ${bots}`)
	const channel = member.guild.channels.find(`name`, 'uye-log');
	if(!channel) return; 
	let Embed = new Discord.RichEmbed()
	.setColor("#e26346")
	.setAuthor(`${member.displayName} isimli üye ${member.guild.name} sunucusundan ayrıldı.`, member.user.displayAvatarURL)
	.setTimestamp()
	.setFooter(`Üye Ayrıldı | Kaç Kişi Olduk = ${member.guild.memberCount}`)
	channel.send(Embed);
	});


//Token
client.login(process.env.BOT_TOKEN);
