// Routes/user

router.post("/register", async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        // First check if email already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const salt = bcrypt.genSaltsync(10);
        const hashedPassword = bcrypt.hashSynch(passord, salt);
        const newUser = await User.create({ name, email, age, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating user" })
    }
});