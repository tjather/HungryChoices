// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default homepage", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Returns entries from the database", (done) => {
    chai
      .request(server)
      .get("/db/foods")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it("Allows login when valid credentails are entered", (done) => {
    const op = {
        id: '2f24vvg', email: 'user@user.com', password: 'password'
    };

    chai
      .request(server)
      .post("/login")
      .send(op)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   it("Returns the details of operation based on the ID passed with 1 and property name and sign", (done) => {
//     chai
//       .request(server)
//       .get("/operations/1")
//       .end((err, res) => {
//         expect(res.body.id).to.equals(1);
//         expect(res.body).to.have.property('name');
//         expect(res.body).to.have.property('sign');  
//         done();
//       });
//   });


//   // ===========================================================================
//   // TODO: Please add your test cases for part B here.

//   it('Adds a player with a valid name, id, and dob', (done) => {
//     const player = {
//       id : 2, 
//       name : 'Jon Do', 
//       dob : '2000-01-20'
//     };
  
//     chai
//       .request(server)
//       .post('/players/add')
//       .send(player)
//       .end((err, res) => {
//         expect(res.body.id).to.equals(player.id);
//         expect(res.body.name).to.equals(player.name);
//         expect(res.body.dob).to.equals(player.dob);
//         expect(res).to.have.status(201);
//         done();
//       });
//   });

//   it('Returns error when a player with a invalid name, id, or dob is added', (done) => {
//     const player = {
//       id : 'a', 
//       name : 'Jon', 
//       dob : '20001-20'
//     };
  
//     chai
//       .request(server)
//       .post('/players/add')
//       .send(player)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it("Returns JSON containing the information of the player when valid ID is passed", done => {
//     chai
//       .request(server)
//       .get("/players/1")
//       .end((err, res) => {
//         res.body.should.have.property('id').eq(1);
//         done();
//       });
//   });

//   it("Returns error when invalid ID is passed", done => {
//     chai
//       .request(server)
//       .get("/players/a")
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//     });

});
