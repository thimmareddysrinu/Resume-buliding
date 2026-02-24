import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDetailbackend, UpdateUserDetailbackend } from '../ReduxToolkit/Reducers/Account-authentication/GetUserDetails';

function Profile() {
  const dispatch = useDispatch();
  const { response, status, errors } = useSelector((state) => state.UserDetails);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  // Step 1: Fetch user data when component mounts
  useEffect(() => {
    dispatch(GetUserDetailbackend());
  }, [dispatch]);

  // Step 2: Populate form when response data arrives
  useEffect(() => {
    if (response) {
      setFormData({
        first_name: response.first_name || '',
        last_name: response.last_name || '',
        email: response.email || '',
        phone_number: response.phone_number || ''
      });
    }
  }, [response]);

  // Step 3: Handle input changes
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Step 4: Handle save/update
  const handleSave = async () => {
    try {
      await dispatch(UpdateUserDetailbackend(formData)).unwrap();
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error);
    }
  };

  // Loading state
  if (status === 'pending') {
    return (
      <div className="container py-5">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Error: {errors}</div>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img 
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
                  alt="avatar"
                  className="rounded-circle img-fluid" 
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">
                  {response?.first_name} {response?.last_name}
                </h5>
                <p className="text-muted mb-1">
                  {response?.email || 'No email provided'}
                </p>
                <p className="text-muted mb-4">
                  {response?.phone_number}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">First Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      name="first_name"
                      type="text"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      name="last_name"
                      type="text"
                      className="form-control"
                      value={formData.last_name}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      name="email"
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      name="phone_number"
                      type="tel"
                      className="form-control"
                      value={formData.phone_number}
                      onChange={handlechange}
                      readOnly
                    />
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-end">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;