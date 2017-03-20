process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let News = require('../models/news');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('News', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        News.remove({}, (err) => {
            done();
        });
    });

    describe('/GET news', () => {
        it('it should GET all the news', (done) => {
            chai.request(server)
                .get('/news')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST news', () => {
        it('it should not POST a new without text field', (done) => {
            let news = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien"
            }
            chai.request(server)
                .post('/news')
                .send(news)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('text');
                    res.body.errors.text.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

    it('it should POST news ', (done) => {
        let news = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            text: "i love testing server"
        }
        chai.request(server)
            .post('/news')
            .send(news)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    describe('/GET/:id book', () => {
        it('it should GET news by the given id', (done) => {
            let news = new News({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", text:"sample text" });
            news.save((err, book) => {
                chai.request(server)
                    .get('/news/' + news.id)
                    .send(news)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('author');
                        res.body.should.have.property('text');
                        res.body.should.have.property('_id').eql(book.id);
                        done();
                    });
            });

        });
    });

});
