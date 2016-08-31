module.exports = function (robot) {
  robot.hear(/Hello!/, function (res) {
    return res.send("Hi there!");
  });
}
