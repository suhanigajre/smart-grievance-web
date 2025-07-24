// Sample grievance data
let grievances = [];

exports.getGrievances = (req, res) => {
  res.status(200).json(grievances);
};

exports.createGrievance = (req, res) => {
  const newGrievance = req.body;
  grievances.push(newGrievance);
  res.status(201).json({ message: 'Grievance submitted!', data: newGrievance });
};
