// describe("template spec", () => {
//   before(() => {
//     cy.visit("http://localhost:4000");
//     cy.request("POST", "http://localhost:4000/api/signup", {
//       name: "Root Admin",
//       email: "admin5@gmail.com",
//       password: "adminPass",
//       role: "user",
//     });
//   });

//   it("passes", () => {
//     cy.request("POST", "http://localhost:4000/api/login", {
//       email: "admin2@gmail.com",
//       password: "adminPass",
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//     });
//   });
// });

describe("auth endpoint tests", () => {
  before(() => {
    Cypress.Cookies.debug(true);
  });

  it("auth user", () => {
    cy.visit("http://localhost:4000");

    //signup test
    cy.request("POST", "http://localhost:4000/api/signup", {
      name: "Bob1234",
      email: "Bob@gmail.com",
      password: "BobPass",
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    // login test
    cy.request("POST", "http://localhost:4000/api/login", {
      email: "Bob@gmail.com",
      password: "BobPass",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // logout test
    cy.request("POST", "http://localhost:4000/api/logout", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("auth admin", () => {
    cy.visit("http://localhost:4000");

    // signup test
    // cy.request("POST", "http://localhost:4000/api/signup", {
    //   name: "Admin1234",
    //   email: "Admin@gmail.com",
    //   password: "AdminPass",
    //   role: "admin",
    // }).then((response) => {
    //   cy.log(response.body);
    // });

    // cy.request("POST", "http://localhost:4000/api/signup", {
    //   name: "Admin1234",
    //   email: "Admin@gmail.com",
    //   password: "AdminPass",
    //   role: "random not real role",
    // }).then((response) => {
    //   cy.log(response.body);
    // });

    // cy.request("POST", "http://localhost:4000/api/signup", {
    //   name: "Admin1234",
    //   email: "Admin@gmail.com",
    //   password: "AdminPass",
    //   role: "provider",
    // }).then((response) => {
    //   cy.log(response.body);
    // });

    // login test
    cy.request("POST", "http://localhost:4000/api/login", {
      email: "Admin@gmail.com",
      password: "AdminPass",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request("GET", "http://localhost:4000/api/users", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    cy.request("GET", "http://localhost:4000/api/users/3", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    cy.request("PUT", "http://localhost:4000/api/users/3", {
      name: "Root Admin",
      email: "AdminChanged@gmail.com",
      password: "AdminPass",
      role: "admin",
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });

    cy.request("DELETE", "http://localhost:4000/api/users/2", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    // logout test
    cy.request("POST", "http://localhost:4000/api/logout", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("admin contacts test", () => {
    cy.visit("http://localhost:4000");

    // login test
    cy.request("POST", "http://localhost:4000/api/login", {
      email: "AdminChanged@gmail.com",
      password: "AdminPass",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // create contact test
    cy.request("POST", "http://localhost:4000/api/contacts", {
      name: "Contact1",
      email: "Admin@gmail.com",
      phone: "123-456-7890",
      message: "Hello World",
    });

    cy.request("POST", "http://localhost:4000/api/contacts", {
      name: "Contact2",
      email: "Test@gmail.com",
      phone: "000-000-0000",
      message: "Test",
    });

    // get contacts test
    cy.request("GET", "http://localhost:4000/api/contacts", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    // get contact by id test
    cy.request("GET", "http://localhost:4000/api/contacts/1", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    // update contact test
    cy.request("PUT", "http://localhost:4000/api/contacts/2", {
      name: "updatedContact",
      email: "AdminTest@gmail.com",
      status: "completed",
      message: "Bye World",
    });

    // delete contact test
    cy.request("DELETE", "http://localhost:4000/api/contacts/1", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      }
    );

    // logout test
    cy.request("POST", "http://localhost:4000/api/logout", {}).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
});
