const Userdb = require("../model/model");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

//create and save new user
exports.create = catchAsync(async (req, res, next) => {
  //vallidate request
  if (!req.body) {
    return next(new AppError("Content cannot be empty!", 400));
  }

  //create and save user
  const user = await Userdb.create({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // redirect user
  res.redirect("/add-user");
});

//get and return single user
exports.find = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  // send error message if id not found
  if (!id) {
    return next(new AppError("Please provide Id", 400));
  }

  // Find user by Id
  const user = await Userdb.findById(id);

  // If no user found, send error message
  if (!user) {
    return next(new AppError("Mentioned user not found from id", 400));
  }

  // If everything is OK, send response
  res.send(data);
});

//update user by id
exports.update = catchAsync(async (req, res, next) => {
  // Check if the request body is empty or not
  if (!req.body) {
    return next(new AppError("Empty data in request body", 400));
  }

  // fetch id from request params
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Please provide Id", 400));
  }

  // Get user from the provided Id
  const user = await Userdb.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  // If not user found, send error message
  if (!user) {
    return next(new AppError("No user found with that Id", 400));
  }

  // Finally, send success response
  res.send(user);
});

//delete user by id
exports.delete = catchAsync(async (req, res) => {
  // fetch id from request params
  const { id } = req.params;

  // Send error message if Id not provided
  if (!id) {
    return next(new AppError("Please provide Id", 400));
  }

  // Get user from the provided Id
  const user = await Userdb.findByIdAndDelete(id);

  // If not user found, send error message
  if (!user) {
    return next(new AppError("No user found with that Id", 400));
  }

  // Finally, send success response
  res.send({ message: "User deleted successfully" });
});
