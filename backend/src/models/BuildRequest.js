const mongoose = require('mongoose');

const buildRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    projectType: {
      type: String,
      required: true,
      enum: ['website', 'web-app', 'software'],
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    selectedPackage: {
      type: String,
      required: true,
      enum: ['basic', 'intermediate', 'professional'],
    },
    requiredFeatures: {
      type: [String],
      default: [],
    },
    extraFeaturesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    needDeployment: {
      type: Boolean,
      default: false,
    },
    timeline: {
      type: String,
      required: true,
      trim: true,
    },
    additionalNotes: {
      type: String,
      default: '',
      trim: true,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      extraFeaturesPrice: {
        type: Number,
        required: true,
      },
      deploymentPrice: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      maintenanceIncluded: {
        type: Boolean,
        default: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'quoted', 'approved', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BuildRequest', buildRequestSchema);
