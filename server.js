const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const UserSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String,
    agree: Boolean
});
const User = mongoose.model('User', UserSchema);

// Sử dụng EJS làm hệ thống mẫu
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, phone, password, agree } = req.body;
    const user = new User({ username, phone, password, agree });

    user.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi đăng ký');
        } else {
            res.status(200).send('Đăng ký thành công');
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Máy chủ đã khởi động tại cổng ${port}`);
});
