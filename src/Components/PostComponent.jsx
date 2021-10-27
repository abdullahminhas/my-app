import React, { Component } from "react";

class PostComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Post: [],
      User: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(result => {
        this.setState({ Post: result });
      });
  }
  handleClick({ currentTarget }) {
    var id = currentTarget.value;
    console.log(id);

    fetch("https://jsonplaceholder.typicode.com/users/" + id)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        var item = [];
        item.push(data);
        this.setState({ User: item });
      });
  }
  render() {
    return (
      <div className="container">
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Post.map(pst => (
                <tr key={pst.id}>
                  <td>{pst.id}</td>
                  <td>{pst.title}</td>
                  <td>{pst.body}</td>
                  <td>
                    <button
                      type="button"
                      value={pst.userId}
                      onClick={this.handleClick}
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {this.state.User.map(usr => (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Nmae</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{usr.name}</td>
                          <td>{usr.username}</td>
                          <td>{usr.email}</td>
                          <td>
                            {usr.address.street},{usr.address.city}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PostComponent;
