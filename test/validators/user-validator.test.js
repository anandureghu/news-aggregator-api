const { expect, assert } = require("chai");
const sinon = require("sinon");
const validator = require("../../src/validators/user-validator");

describe("user-validator tests", () => {
  describe("validRequiredField tests", () => {
    it("should return true for value not empty", (done) => {
      const valid = validator.validRequiredField("value");
      expect(valid).equal(true);
      done();
    });
    it("should return false for value empty", (done) => {
      const valid = validator.validRequiredField("");
      expect(valid).equal(false);
      done();
    });
    it("should return false for value empty space", (done) => {
      const valid = validator.validRequiredField(" ");
      expect(valid).equal(false);
      done();
    });
  });

  describe("validateUserLogin tests", () => {
    it("should return no errors for validateUserLogin", (done) => {
      const user = {
        username: "username",
        password: "password",
      };
      const errors = validator.validateUserLogin(user);
      expect(errors.length).equal(0);
      done();
    });

    it("should get one error without username", (done) => {
      const user = {
        username: "",
        password: "password",
      };
      const errors = validator.validateUserLogin(user);
      expect(errors.length).equal(1);
      done();
    });

    it("should get one error without password", (done) => {
      const user = {
        username: "username",
        password: "",
      };
      const errors = validator.validateUserLogin(user);
      expect(errors.length).equal(1);
      done();
    });

    it("should get two errors without username and password", (done) => {
      const user = {};
      const errors = validator.validateUserLogin(user);
      expect(errors.length).equal(2);
      done();
    });

    it("should get two errors with empty username and password", (done) => {
      const user = {
        username: "",
        password: "",
      };
      const errors = validator.validateUserLogin(user);
      expect(errors.length).equal(2);
      done();
    });
  });

  describe("validateUserRegistration tests", () => {
    it("should return no errors for validateUserLogin", (done) => {
      const user = {
        username: "test_username",
        password: "test_password",
        confirmPass: "test_password",
        email: "test_email",
      };
      const errors = validator.validateUserRegistration(user);
      expect(errors.length).equal(0);
      done();
    });

    it("should return 4 errors without required fields", (done) => {
      const user = {};
      const errors = validator.validateUserRegistration(user);
      expect(errors.length).equal(4);
      done();
    });
  });
});
