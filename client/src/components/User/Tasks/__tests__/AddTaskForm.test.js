import React from "react";
import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import AddTask from "../AddTaskForm";

Enzyme.configure({ adapter: new Adapter() });

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Add Task", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    render(
      <Router>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Link>
            <AddTask />
          </Link>
        </MuiPickersUtilsProvider>
      </Router>
    );
  });
});
