import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "react-axios";

class UserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Posts: [],
      CPost: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick({ currentTarget }) {
    // console.log(currentTarget.value); // e.currentTarget.value would be equivalent
    var id = currentTarget.value;
    console.log(id);
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then(response => response.json())
      .then(item => {
        console.log(item);
        var data = [];
        data.push(item);
        // this.state.Post.push();
        this.setState({
          CPost: data,
        });
      });
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        this.setState({
          Posts: result,
        });
      });
  }

  //   Cont api = axios.create({
  //     baseURL: `https://jsonplaceholder.typicode.com/posts`,
  //   });
  //   getPost = async id => {
  //     let data = await api.get(`/${id}`);
  //   };
  render() {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {this.state.Posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    value={post.id}
                    onClick={this.handleClick}
                    className="btn btn-primary"
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {this.state.CPost.map(cpos => (
                  <form action="#">
                    <div className="form-group mb-3">
                      <label htmlFor="id">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cpos.id}
                        id="id"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="tit">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cpos.title}
                        id="tit"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="body">Body</label>
                      <textarea
                        className="form-control"
                        name=""
                        id="body"
                        cols="30"
                        value={cpos.body}
                        rows="10"
                      ></textarea>
                    </div>
                  </form>
                ))}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserComponent;
