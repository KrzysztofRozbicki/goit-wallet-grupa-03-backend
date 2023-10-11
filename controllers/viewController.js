import User from '../service/schemas/users.js';

export const getInfo = async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

export const getCustomers = async (req, res) => {
  try {
    res.render('customers/index', { customer: new User() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

// export const getNotFound = async (req, res) => {
//   try {
//     res.render('notFound/index');
//   } catch (error) {
//     console.error(err);
//     res.status(500).json({ error: 'Error' });
//   }
// };
