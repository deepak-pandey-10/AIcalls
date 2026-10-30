const leads = require("../data/leads");

// GET all leads
const getLeads = (req, res) => {
  res.status(200).json({
    success: true,
    count: leads.length,
    data: leads,
  });
};

// CREATE a lead
const createLead = (req, res) => {
  const { name, phone, course, status } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, phone, and course are required",
    });
  }

  const newLead = {
    id: Date.now(),
    name,
    phone,
    course,
    status: status || "New",
  };

  leads.push(newLead);

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    data: newLead,
  });
};

// UPDATE a lead
const updateLead = (req, res) => {
  const id = Number(req.params.id);
  const lead = leads.find((item) => item.id === id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  const { name, phone, course, status } = req.body;

  if (name !== undefined) lead.name = name;
  if (phone !== undefined) lead.phone = phone;
  if (course !== undefined) lead.course = course;
  if (status !== undefined) lead.status = status;

  res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    data: lead,
  });
};

// DELETE a lead
const deleteLead = (req, res) => {
  const id = Number(req.params.id);
  const index = leads.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  const deletedLead = leads.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
    data: deletedLead,
  });
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
};