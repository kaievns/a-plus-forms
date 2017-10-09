require('babel-register')({
  cache: true
});

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const chai = require('chai');
chai.use(require('chai-enzyme')());
chai.use(require('sinon-chai'));

global.expect = chai.expect;

const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
