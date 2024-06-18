import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeDetails from "./EmployeeDetails";

const RegisterForm = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    //e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/register`, formData);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-control"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter your first name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="form-control"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter your last name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            Please enter your phone number.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
          <div className="invalid-feedback">Please enter your address.</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <EmployeeDetails employees={employees} />
    </div>
  );
};

export default RegisterForm;
