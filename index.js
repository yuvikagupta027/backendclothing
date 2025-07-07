require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');

var app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1000;

const uri = process.env.MONGO_URI;

var connection = "mongodb+srv://yuvika:yuvika123@cluster0.l0eiy9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var db;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yuvikagupta1121@gmail.com',  // your email
        pass: 'kylh gljn kjro xnil'         // your app password
    }
});

MongoClient.connect(connection).then((succ) => {
    console.log("db connected");
    db = succ.db("mydatabase");
})


app.post("/registerform", (req, res) => {
    const { Username, Email, Password, Contact } = req.body;
    // console.log(req.body);

    db.collection("users").findOne({ Email: Email }).then(existingUser => {
        if (existingUser) {
            return res.send({ alreadyRegistered: true });
        }
        db.collection("users").insertOne({ Username, Email, Password, Contact }).then((succ) => {
            const mailOptions = {
                from: 'yuvikagupta1121@gmail.com',
                to: Email,
                subject: 'Welcome to Our Website!',
                text: `Hi ${Username},\n\nThanks for registering with us!\n\nRegards,\nTeam`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Email sending failed:', error);
                    return res.status(500).send({
                        registration: true,
                        emailSent: false,
                        error: error.toString()
                    });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.send({
                        registration: true,
                        emailSent: true,
                        emailInfo: info.response
                    });
                }
            });
        })
    })
});

app.post("/loginform", (req, res) => {
    const { Email, Password } = req.body;

    db.collection("users").findOne({ Email }).then(user => {
        if (!user) {
            return res.send({ error: "User not found" });
        }

        if (user.Password !== Password) {
            return res.send({ error: "Incorrect password" });
        }

        // Success
        res.send(user);
    }).catch(err => {
        console.error("Login error:", err);
        res.status(500).send({ error: "Internal server error" });
    });
});

app.post("/logincheck", (req, res) => {
    // console.log(req.body.Id);
    db.collection("users").findOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/loginadmin", (req, res) => {
    db.collection("users").findOne(req.body).then((succ) => {
        res.send(succ);
    })
})

app.post("/adminlogincheck", (req, res) => {
    // console.log(req.body.Id);
    db.collection("users").findOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/addproduct", (req, res) => {
    db.collection("products").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchproducts", (req, res) => {
    db.collection("products").find().toArray().then((succ) => {
        res.send(succ);
        console.log(succ);

    })
})

app.post("/deleteproducts", (req, res) => {
    db.collection("products").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/fetchusers", (req, res) => {
    db.collection("users").find().toArray().then((succ) => {
        res.send(succ)
    })
})

app.post("/submitcategories", (req, res) => {
    db.collection("categories").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchcategories", (req, res) => {
    db.collection("categories").find().toArray().then((succ) => {
        res.send(succ)
    })
})

app.post("/deletecategories", (req, res) => {
    db.collection("categories").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

// app.post("/addtocart", (req, res) => {
//     db.collection("cart").insertOne(req.body).then((succ) => {
//         res.send("ok");
//     })
// })

app.post("/addtocart", (req, res) => {
    const { userId, Productname, selectedSize } = req.body;
    db.collection("cart").findOne({
        userId: userId,
        Productname: Productname,
        selectedSize: selectedSize
    })
    .then((existingItem) => {
        if (existingItem) {
            // If item exists, increase CartValue
            return db.collection("cart").updateOne(
                { _id: existingItem._id },
                { $inc: { CartValue: req.body.CartValue || 1 } }
            ).then(() => {
                res.send("updated");
            });
        } else {
            // If not in cart, insert new item
            return db.collection("cart").insertOne(req.body)
                .then(() => {
                    res.send("ok");
                });
        }
    })
});


app.post("/fetchcart", (req, res) => {
    console.log(req.body.id);

    db.collection("cart").find({
        userId: req.body.id
    }).toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/increasecart", (req, res) => {

    const { _id } = req.body;
    db.collection("cart").updateOne(
        { _id: new mongodb.ObjectId(_id) },
        { $inc: { CartValue: 1 } }
    )
        .then((succ) => {
            res.send("Quantity increased");
        })
})
app.post("/decreasecart", (req, res) => {
    const { _id } = req.body;
    db.collection("cart").updateOne(
        { _id: new mongodb.ObjectId(_id) },
        { $inc: { CartValue: -1 } }
    )
        .then((succ) => {
            res.send("Quantity increased");
        })
})
app.post("/deleteitem", (req, res) => {
    db.collection("cart").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send("ok")
    })
})

app.post("/submitaddress", (req, res) => {
    db.collection("address").insertOne(req.body).then((succ) => {
        res.send("ok")
    })
})

app.post("/fetchaddress", (req, res) => {
    db.collection("address").find().toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/deleteaddress", (req, res) => {
    db.collection("address").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post("/placeorder", async (req, res) => {
    try {
        const orderResult = await db.collection("orders").insertOne(req.body);
        const cartItems = req.body.cartItems;
        const deletePromises = cartItems.map(item =>
            db.collection("cart").deleteOne({ _id: new mongodb.ObjectId(item._id) })
        );
        await Promise.all(deletePromises);
        res.send({ message: "Order placed and cart cleared", orderId: orderResult.insertedId });
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).send({ message: "Failed to place order" });
    }
});

app.post("/fetchorders", (req, res) => {
    console.log(req.body.id);

    db.collection("orders").find({
        userId: req.body.id
    }).toArray().then((succ) => {
        res.send(succ);
    })
})

app.post("/fetchadminorders", (req, res) => {
    db.collection("orders").find().toArray().then((succ) => {
        res.send(succ);

    })
})

app.post("/fetchorder", (req, res) => {
    db.collection("orders").findOne({
        _id: new mongodb.ObjectId(req.body.idd)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/fetchadminorder", (req, res) => {
    db.collection("orders").findOne({
        _id: new mongodb.ObjectId(req.body.idd)
    }).then((succ) => {
        res.send(succ);
    })
})

app.post("/deleteorders", (req, res) => {
    db.collection("orders").deleteOne({
        _id: new mongodb.ObjectId(req.body.Id)
    }).then((succ) => {
        res.send(succ)
    })
})

app.post('/cancelorder', (req, res) => {
    const { id } = req.body;

    db.collection("orders").updateOne({ _id: new mongodb.ObjectId(id) }, { $set: { status: "Cancelled" } })
        .then(() => res.send("ok"))
        .catch((err) => {
            console.error(err);
            res.status(500).send("error");
        });
});

app.post('/deliverorder', (req, res) => {
    const { id } = req.body;

    db.collection("orders").updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { status: "Delivered" } }
    )
        .then(() => res.send("ok"))
        .catch((err) => {
            console.error("Error updating to delivered:", err);
            res.status(500).send("error");
        });
});

app.post("/submitemailfooter", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const existingEmail = await db.collection("emails").findOne({ email: email });
        if (existingEmail) {
            return res.status(409).send("Email already subscribed"); // 409 = Conflict
        }

        await db.collection("emails").insertOne({ email: email });
        res.send("Subscribed successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post("/trackorder", async (req, res) => {
    const { email } = req.body;

    try {
        const orders = await db.collection("orders")
            .find({ "address.Email": email })
            .sort({ orderDate: -1 })
            .toArray(); // Convert cursor to array

        if (orders.length > 0) {
            res.json(orders);
        } else {
            res.status(404).json({ error: "No orders found for this email" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/", (req, res) => {
  res.send("MongoDB without Mongoose!");
});

app.listen(1000, (req, res) => {
    console.log("Server Started");
})