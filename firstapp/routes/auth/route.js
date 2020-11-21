const login = async (req, res) => {
  try {


    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {login, logout}
