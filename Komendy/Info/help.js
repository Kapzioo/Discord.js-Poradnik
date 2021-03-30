const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Bot wysyła listę swoich wszystkich komend!",
  usage: "[Nazwa Komendy]",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./Komendy/").forEach((dir) => {
        const commands = readdirSync(`./Komendy/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../Komendy/${dir}/${command}`);

          if (!file.name) return "Nie znaleziono takiej komendy!";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "W trakcie!" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("Potrzebujesz pomocy? Oto wszystkie moje polecenia!")
        .addFields(categories)
        .setDescription(
          `Aby uzyskać więcej informacji o komendzie wpisz \`${prefix}help (Nazwa Komendy)\`!`
        )
        .setFooter(
          `${message.author.tag} (${message.author.id})`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Źle wpisana komenda! Użyj \`${prefix}help\` aby zerknąć na liste moich komend!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Detale Komendy:")
        .addField("Prefix:", `\`${prefix}\``)
        .addField(
          "Komenda:",
          command.name ? `\`${command.name}\`` : "Brak nazwy dla tej komendy!"
        )
        .addField(
          "Aliasy:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Brak aliasów dla tej komendy!"
        )
        .addField(
          "Użycie:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Opis:",
          command.description
            ? command.description
            : "Brak opisu komendy!"
        )
        .setFooter(
          `${message.author.tag} (${message.author.id})`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
