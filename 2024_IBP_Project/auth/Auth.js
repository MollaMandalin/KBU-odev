const User = require("../models/user.js")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const jwtSecret = "1d9068c640ed14bfde4c1202885ff6299a802c7e09d416625ca7b22d6185efc0a380cd"



exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Şifreniz 6 karakterden küçük olmamalı" })
    }
    try {
        bcrypt.hash(password, 10).then(
            async (hash) => {
                await User.create({ username, password: hash })
                    .then((user) => {

                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                            { id: user._id, role: user.role },
                            jwtSecret,
                            {
                                expiresIn: maxAge // 3hrs in sec
                            }
                        );

                        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // 3 hrs in ms
                        res.status(201).json({ message: "User succesfully created", user: user._id });

                    }

                    )
            }
        )

    } catch (err) {
        res.status(401).json({ message: "User not succesfully created", error: err.message })
    }
}



exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username or Password not present" })
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Login not succesful", error: "User not found" })
        }

        bcrypt.compare(password, user.password).then(
            (result) => {
                if (result) {
                    const maxAge = 3 * 60 * 60 // 3 hrs in second
                    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: maxAge })
                    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }) // 3 hrs in ms
                    res.status(200).json({ message: "Login succesful", user: user._id, role: user.role})
                }
                else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            }
        )

    } catch (err) {
        res.status(400).json({ message: "An error occurred" })
    }

}


exports.update = async (req, res, next) => {
    const { role, id } = req.body

    if (role && id) {
        if (role === 'admin') {
            await User.findById(id)
                .then(
                    (user) => {
                        if (user.role !== 'admin') {
                            user.role = role;
                            user.save((err) => {
                                res.status(400).json({ message: "An error occurred", error: err.message });
                                process.exit(1);
                            })
                            res.status("201").json({ message: "Update successful", user });
                        }

                        else {
                            res.status(400).json({ message: "User is already an admin" })
                        }
                    }
                ).catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                });

        }
        else {
            res.status(400).json({ message: "Role is not admin" })
        }
    }
    else {
        res.status(400).json({ message: "Role or Id not present" })
    }
}


exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findByIdAndDelete(id)
        .then(user => res.status(200).json({ message: "User succesfully deleted", user }))
        .catch(error => res.status(400).json({ message: "An error occurred", error: error.message }))
}