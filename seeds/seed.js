const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models")

const seed = async () => {
    const userData = await User.bulkCreate([
        {
            username: "Doug",
            password: "password",
            email: "dough@chikapacha.com"
        },
        {
            username: "Skeeter",
            password: "password",
            email: "Skeeter@chikapacha.com"
        },
        {
            username: "Patty",
            password: "password",
            email: "patty@chikapacha.com"
        }
    ], {
        individualHooks: true
    })
    const blogData = await Blog.bulkCreate([
        {
            title: "Python or Ruby on Rails??",
            body: "I want to be as competitive as possible as a developer. I have become confident at JavaScript but am wondering which way to go next. What is more cutting edge and trending?",
            UserId: 1
        },
        {
            title: "Six reasons to override Bootstrap defaults",
            body: "1. Your professor will yell at you. 2. Your PM will yell at you. 3. Your interviewer will yell at you. 4. Your client will yell at you. 5. Boostrap default colors will yell at you. 6. Future you will yell at you.",
            UserId: 2
        },
        {
            title: "EmailJS and Sweetalert2",
            body: "I recently discovered the magic and simplicity of adding email submission capabilities via NPM package EmailJS. Customize default styling easily inline. Check it out! It may just change your portfolio game!",
            UserId: 3
        }
    ])
    const commentData = await Comment.bulkCreate([
        {
            body: "If you've got JS down, I wouldn't worry to much about dedicating all of your time on one. Companies will be pleased with your ability to learn and it depends on the job which one you will be using.",
            username: "Patty",
            UserId: 3,
            BlogId: 1
        },
        {
            body: "Hahahaha this is amazing! Does anyone know how to override the defaults though? Is it just the css property '!important' ?",
            username: "Doug",
            UserId: 1,
            BlogId: 2
        },
        {
            body: "Oh snap! I am going to have to check it out. I am trying to get my success message customized to my site theme!",
            username: "Skeeter",
            UserId: 2,
            BlogId: 3
        }
    ])
}

sequelize.sync({ force: false }).then(() => {
    seed();
})