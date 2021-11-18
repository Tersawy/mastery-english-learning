const online = {};

exports.create = async socket => {
  const id = socket.decoded.userId;
  online[id] = socket;
  console.log(id, "connected");
  console.log("#".repeat(50))
};

exports.getSocket = id => online[id];

exports.anySocket = () => {
  return online[Object.keys(online)[0]];
};

exports.remove = id => delete online[id];

exports.worldRoom = "WORLD_CHAT";
