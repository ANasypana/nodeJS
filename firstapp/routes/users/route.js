const getAllUsers = async (req, res) => {
  try {
    const data = {total: 100, pagination: {}, data: []}


    return res.status(200).json(data);

  }catch (err){
    res.status(400).json({ message: err.message });
  }
}

const createUser = async (req, res) => {
  try {
    const user = req.body;


    return res.status(201).json(user);

  }catch (err){
    res.status(400).json({ message: err.message });
  }
}

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = {userId, name: 'OneUser'};


    return res.status(200).json(user);

  }catch (err){
    res.status(400).json({ message: err.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = req.body;


    return res.status(200).json(user);

  }catch (err){
    res.status(400).json({ message: err.message });
  }

}

const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const message = `User with id ${userId} was removed`;
    console.log(message)

    return res.sendStatus(204);

  }catch (err){
    res.status(400).json({ message: err.message });
  }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
