const supertest = require("supertest");

const Server = require('../src/server/server');
const server = new Server();
server.run();
const app = server.getApp();

describe("Exemple Controller", () => {
    test("GET / of helloworld", async () => {
        await supertest(app)
            .get('')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual({
                    message: "Hello World"
                });
            });
    })
});
