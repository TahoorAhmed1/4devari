import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { request } from "../request";
import { message } from "antd";
import Router from "next/router";

const initialState = {
  loading: false,
  property: {},
  propertyById: {},
  updateProperties: {},
  deleteProperties: {},
  points: [],
  properties: [],
  loadingProperties: false,

  similarProperties: [],
  loadingSimilarProperties: false,

  recommendedProperties: [],
  loadingRecommendedProperties: false,

  propertiesForSale: [],
  loadingPropertiesForSale: false,
  propertiesForRent: [],
  loadingPropertiesForRent: false,
  propertiesForShare: [],
  loadingPropertiesForShare: false,
  deleteProperties: {},
  deleteProperties: {},
  residentialProperties: {},
  commercialProperties: {},
  plotsProperties: {},
  colivingProperties: {},
  coworkingProperties: {},

  userProperties: [],
  userPropertiesForSale: [],
  userPropertiesForRent: [],
  userPropertiesForShareLiving: [],
  userPropertiesForCoWorking: [],

  loadingPoints: false,
  loadingUserProperties: false,
  loadingUserPropertiesForSale: false,
  loadingUserPropertiesForRent: false,
  loadingUserPropertiesForShareLiving: false,
  loadingUserPropertiesForCoWorking: false,

  // Builder Project

  loadingProjectById: false,
  loadingProjectsByUserId: false,
  loadingAllProjects: false,
  addingProject: false,
  updatingProject: false,
  deletingProject: false,
  projectById: null,
  projectsByUserId: [],
  allProjects: [],
  loadingFeatureProjects: false,
  featureProjects: [],
  newLaunch: [],
  loadingNewLaunch: false,
  readyMove: [],
  loadingReadyMove: false,
  underConstructionProjects: [],
  loadingUnderConstruction: false,

  error: "",
};

export const fetchPropertyById = createAsyncThunk(
  "property/fetchPropertyById",
  async (id, thunkAPI) => {
    const response = await request
      .get(`property/${id}`)
      .then((response) => response.data);
    return response;
  }
);

export const addProperty = createAsyncThunk(
  "property/addProperty",
  async (payload, thunkAPI) => {
    const response = await request
      .post("property", payload)
      .then((response) => response.data);
    return response;
  }
);

export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async (payload, thunkAPI) => {
    const response = await request
      .patch(`property/${payload?.id}`, payload)
      .then((response) => response.data);
    return response;
  }
);

export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async (id, thunkAPI) => {
    const response = await request
      .delete(`property/${id}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchSimilarProperties = createAsyncThunk(
  "property/fetchSimilarProperties",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchRecommendedProperties = createAsyncThunk(
  "property/fetchRecommendedProperties",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchPoints = createAsyncThunk(
  "property/fetchPoints",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property/points${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchPropertiesForSale = createAsyncThunk(
  "property/fetchPropertiesForSale",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property?purpose=buy${query?.length > 0 ? `&${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchPropertiesForRent = createAsyncThunk(
  "property/fetchPropertiesForRent",
  async (query, thunkAPI) => {
    const response = await request
      .get(`property?purpose=rent${query?.length > 0 ? `&${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchPropertiesForShare = createAsyncThunk(
  "property/fetchPropertiesForShare",
  async (query, thunkAPI) => {
    const response = await request
      .get(
        `property?purpose=coliving space${query?.length > 0 ? `&${query}` : ""}`
      )
      .then((response) => response.data);
    return response;
  }
);

export const fetchResidentialProperties = createAsyncThunk(
  "property/fetchResidentialProperties",
  async (_, thunkAPI) => {
    const response = await request
      .get("property/residential")
      .then((response) => response.data);
    return response;
  }
);

export const fetchCommercialProperties = createAsyncThunk(
  "property/fetchCommercialProperties",
  async (_, thunkAPI) => {
    const response = await request
      .get("property/commercial")
      .then((response) => response.data);
    return response;
  }
);

export const fetchPlotProperties = createAsyncThunk(
  "property/fetchPlotProperties",
  async (_, thunkAPI) => {
    const response = await request
      .get("property/plot")
      .then((response) => response.data);
    return response;
  }
);

export const fetchColivingProperties = createAsyncThunk(
  "property/fetchColivingProperties",
  async (_, thunkAPI) => {
    const response = await request
      .get("property/coliving")
      .then((response) => response.data);
    return response;
  }
);

export const fetchCoworkingProperties = createAsyncThunk(
  "property/fetchCoworkingProperties",
  async (_, thunkAPI) => {
    const response = await request
      .get("property/coworking")
      .then((response) => response.data);
    return response;
  }
);

// USER PROPERIES REQUEST

export const fetchUserProperties = createAsyncThunk(
  "property/fetchUserProperties",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`property/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

export const fetchUserPropertiesForSale = createAsyncThunk(
  "property/fetchUserPropertiesForSale",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`property/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchUserPropertiesForRent = createAsyncThunk(
  "property/fetchUserPropertiesForRent",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`property/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchUserPropertiesForShareLiving = createAsyncThunk(
  "property/fetchUserPropertiesForShareLiving",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`property/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);
export const fetchUserPropertiesForCoWorking = createAsyncThunk(
  "property/fetchUserPropertiesForCoWorking",
  async ({ id, query }, thunkAPI) => {
    const response = await request
      .get(`property/user/${id}${query?.length > 0 ? `?${query}` : ""}`)
      .then((response) => response.data);
    return response;
  }
);

// Builder Projects

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (id, thunkAPI) => {
    const response = await request.get(`project/${id}`);
    return response.data;
  }
);

export const fetchProjectsByUserId = createAsyncThunk(
  "project/fetchProjectsByUserId",
  async ({ userId, query }, thunkAPI) => {
    const response = await request.get(
      `project/user/${userId}${query?.length > 0 ? `?${query}` : ""}`
    );
    return response.data;
  }
);
export const fetchFeatureProjects = createAsyncThunk(
  "project/fetchFeatureProjects",
  async (query, thunkAPI) => {
    const response = await request.get(
      `project${query?.length > 0 ? `?${query}` : ""}`
    );
    return response.data;
  }
);
// {status: "New Launch"}
export const fetchNewLaunchProjects = createAsyncThunk(
  "project/fetchNewLaunchProjects",
  async (query, thunkAPI) => {
    const response = await request.get(
      `project${query?.length > 0 ? `?${query}` : ""}`
    );
    return response.data;
  }
);
// dispatch(fetchReadyProjects(objectToQueryString({status: "Ready to move"})))
export const fetchReadyProjects = createAsyncThunk(
  "project/fetchReadyProjects",
  async (query, thunkAPI) => {
    const response = await request.get(
      `project${query?.length > 0 ? `?${query}` : ""}`
    );
    return response.data;
  }
);
export const fetchUnderConstructionProjects = createAsyncThunk(
  "project/fetchUnderConstructionProjects",
  async (query, thunkAPI) => {
    const response = await request.get(
      `project${query?.length > 0 ? `?${query}` : ""}`
    );
    return response.data;
  }
);

export const fetchAllProjects = createAsyncThunk(
  "project/fetchAllProjects",
  async (_, thunkAPI) => {
    const response = await request.get("project");
    return response.data;
  }
);

export const getAllProperty = createAsyncThunk(
  "project",
  async (projectData, thunkAPI) => {
    const response = await request.get("project");
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  "project/addProject",
  async (projectData, thunkAPI) => {
    const response = await request.post("project", projectData);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (projectData, thunkAPI) => {
    const { id, ...data } = projectData;
    const response = await request.patch(`project/${id}`, data);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, thunkAPI) => {
    const response = await request.delete(`project/${id}`);
    return response.data;
  }
);

const propertySlice = createSlice({
  name: "addproperty",
  initialState,
  reducers: {
    updatePropertyState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log("HYDRATE", action.payload);

      state.property = action.payload.property.property
        ? action.payload.property.property
        : state.property;
      state.propertyById = action.payload.property.propertyById
        ? action.payload.property.propertyById
        : state.propertyById;
      state.updateProperties = action.payload.property.updateProperties
        ? action.payload.property.updateProperties
        : state.property;
      state.deleteProperties = action.payload.property.deleteProperties
        ? action.payload.property.deleteProperties
        : state.property;
      state.propertiesForSale = action.payload.property.propertiesForSale
        ? action.payload.property.propertiesForSale
        : state.propertiesForSale;
      state.properties = action.payload.property.properties
        ? action.payload.property.properties
        : state.properties;
      state.points = action.payload.property.points
        ? action.payload.property.points
        : state.points;
      state.propertiesForRent = action.payload.property.propertiesForRent
        ? action.payload.property.propertiesForRent
        : state.propertiesForRent;
      state.propertiesForShare = action.payload.property.propertiesForShare
        ? action.payload.property.propertiesForShare
        : state.propertiesForShare;
      state.residentialProperties = action.payload.property
        .residentialProperties
        ? action.payload.property.residentialProperties
        : state.property;
      state.commercialProperties = action.payload.property.commercialProperties
        ? action.payload.property.commercialProperties
        : state.property;
      state.plotsProperties = action.payload.property.plotsProperties
        ? action.payload.property.plotsProperties
        : state.property;
      state.colivingProperties = action.payload.property.colivingProperties
        ? action.payload.property.colivingProperties
        : state.property;
      state.coworkingProperties = action.payload.property.coworkingProperties
        ? action.payload.property.coworkingProperties
        : state.property;
      state.userProperties = action.payload.property.userProperties
        ? action.payload.property.userProperties
        : state.userProperties;
    });

    builder.addCase(addProperty.pending, (state) => {
      state.loading = true;
      message.open({
        type: "loading",
        content: "creating property",
        duration: 0,
      });
    });
    builder.addCase(addProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.property = action.payload;
      state.error = "";
      message.destroy();
      message.success(`Property listed Successfully`);
      Router.push("/");
    });
    builder.addCase(addProperty.rejected, (state, action) => {
      state.loading = false;
      state.property = {};
      state.error = action.error.message;
      message.destroy();
      message.error("Invalid request");
    });

    builder.addCase(updateProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.updateProperties = action.payload;
      state.error = "";
    });
    builder.addCase(updateProperty.rejected, (state, action) => {
      state.loading = false;
      state.updateProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(deleteProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProperties = {};
      state.error = "";
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.loading = false;
      state.deleteProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchPropertyById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPropertyById.fulfilled, (state, action) => {
      state.loading = false;
      state.propertyById = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPropertyById.rejected, (state, action) => {
      state.loading = false;
      state.propertyById = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchProperties.pending, (state) => {
      state.loadingProperties = true;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loadingProperties = false;
      state.properties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.loadingProperties = false;
      state.properties = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchSimilarProperties.pending, (state) => {
      state.loadingSimilarProperties = true;
    });
    builder.addCase(fetchSimilarProperties.fulfilled, (state, action) => {
      state.loadingSimilarProperties = false;
      state.similarProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSimilarProperties.rejected, (state, action) => {
      state.loadingSimilarProperties = false;
      state.similarProperties = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchRecommendedProperties.pending, (state) => {
      state.loadingRecommendedProperties = true;
    });
    builder.addCase(fetchRecommendedProperties.fulfilled, (state, action) => {
      state.loadingRecommendedProperties = false;
      state.recommendedProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRecommendedProperties.rejected, (state, action) => {
      state.loadingRecommendedProperties = false;
      state.recommendedProperties = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchPoints.pending, (state) => {
      state.loadingPoints = true;
    });
    builder.addCase(fetchPoints.fulfilled, (state, action) => {
      state.loadingPoints = false;
      state.points = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPoints.rejected, (state, action) => {
      state.loadingPoints = false;
      state.points = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchPropertiesForSale.pending, (state) => {
      state.loading = true;
      state.loadingPropertiesForSale = true;
    });
    builder.addCase(fetchPropertiesForSale.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForSale = false;
      state.propertiesForSale = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPropertiesForSale.rejected, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForSale = false;
      state.propertiesForSale = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchPropertiesForRent.pending, (state) => {
      state.loading = true;
      state.loadingPropertiesForRent = true;
    });
    builder.addCase(fetchPropertiesForRent.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForRent = false;
      state.propertiesForRent = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPropertiesForRent.rejected, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForRent = false;
      state.propertiesForRent = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchPropertiesForShare.pending, (state) => {
      state.loading = true;
      state.loadingPropertiesForShare = true;
    });
    builder.addCase(fetchPropertiesForShare.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForShare = false;
      state.propertiesForShare = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPropertiesForShare.rejected, (state, action) => {
      state.loading = false;
      state.loadingPropertiesForShare = false;
      state.propertiesForShare = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchResidentialProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchResidentialProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.residentialProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchResidentialProperties.rejected, (state, action) => {
      state.loading = false;
      state.residentialProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchCommercialProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommercialProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.commercialProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCommercialProperties.rejected, (state, action) => {
      state.loading = false;
      state.commercialProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchPlotProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlotProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.plotsProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPlotProperties.rejected, (state, action) => {
      state.loading = false;
      state.plotsProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchColivingProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColivingProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.colivingProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchColivingProperties.rejected, (state, action) => {
      state.loading = false;
      state.colivingProperties = {};
      state.error = action.error.message;
    });

    builder.addCase(fetchCoworkingProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoworkingProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.coworkingProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCoworkingProperties.rejected, (state, action) => {
      state.loading = false;
      state.coworkingProperties = {};
      state.error = action.error.message;
    });

    // User Reducers

    builder.addCase(fetchUserProperties.pending, (state) => {
      state.loadingUserProperties = true;
      state.loading = true;
    });
    builder.addCase(fetchUserProperties.fulfilled, (state, action) => {
      state.loadingUserProperties = false;
      state.loading = false;
      state.userProperties = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserProperties.rejected, (state, action) => {
      state.loadingUserProperties = false;
      state.loading = false;
      state.userProperties = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchUserPropertiesForSale.pending, (state) => {
      state.loadingUserPropertiesForSale = true;
      state.loading = true;
    });
    builder.addCase(fetchUserPropertiesForSale.fulfilled, (state, action) => {
      state.loadingUserPropertiesForSale = false;
      state.loading = false;
      state.userPropertiesForSale = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserPropertiesForSale.rejected, (state, action) => {
      state.loadingUserPropertiesForSale = false;
      state.loading = false;
      state.userPropertiesForSale = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchUserPropertiesForRent.pending, (state) => {
      state.loadingUserPropertiesForRent = true;
      state.loading = true;
    });
    builder.addCase(fetchUserPropertiesForRent.fulfilled, (state, action) => {
      state.loadingUserPropertiesForRent = false;
      state.loading = false;
      state.userPropertiesForRent = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserPropertiesForRent.rejected, (state, action) => {
      state.loadingUserPropertiesForRent = false;
      state.loading = false;
      state.userPropertiesForRent = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchUserPropertiesForShareLiving.pending, (state) => {
      state.loadingUserPropertiesForShareLiving = true;
      state.loading = true;
    });
    builder.addCase(
      fetchUserPropertiesForShareLiving.fulfilled,
      (state, action) => {
        state.loadingUserPropertiesForShareLiving = false;
        state.loading = false;
        state.userPropertiesForShareLiving = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchUserPropertiesForShareLiving.rejected,
      (state, action) => {
        state.loadingUserPropertiesForShareLiving = false;
        state.loading = false;
        state.userPropertiesForShareLiving = [];
        state.error = action.error.message;
      }
    );

    builder.addCase(fetchUserPropertiesForCoWorking.pending, (state) => {
      state.loadingUserPropertiesForCoWorking = true;
      state.loading = true;
    });
    builder.addCase(
      fetchUserPropertiesForCoWorking.fulfilled,
      (state, action) => {
        state.loadingUserPropertiesForCoWorking = false;
        state.loading = false;
        state.userPropertiesForCoWorking = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchUserPropertiesForCoWorking.rejected,
      (state, action) => {
        state.loadingUserPropertiesForCoWorking = false;
        state.loading = false;
        state.userPropertiesForCoWorking = [];
        state.error = action.error.message;
      }
    );

    // builder
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.loadingProjectById = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loadingProjectById = false;
        state.projectById = action.payload;
        state.error = "";
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loadingProjectById = false;
        state.projectById = null;
        state.error = action.error.message;
      })
      .addCase(fetchProjectsByUserId.pending, (state) => {
        state.loadingProjectsByUserId = true;
      })
      .addCase(fetchProjectsByUserId.fulfilled, (state, action) => {
        state.loadingProjectsByUserId = false;
        state.projectsByUserId = action.payload;
        state.error = "";
      })
      .addCase(fetchProjectsByUserId.rejected, (state, action) => {
        state.loadingProjectsByUserId = false;
        state.projectsByUserId = [];
        state.error = action.error.message;
      })
      .addCase(fetchAllProjects.pending, (state) => {
        state.loadingAllProjects = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loadingAllProjects = false;
        state.allProjects = action.payload;
        state.error = "";
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loadingAllProjects = false;
        state.allProjects = [];
        state.error = action.error.message;
      })

      .addCase(fetchFeatureProjects.pending, (state) => {
        state.loadingFeatureProjects = true;
      })
      .addCase(fetchFeatureProjects.fulfilled, (state, action) => {
        state.loadingFeatureProjects = false;
        state.featureProjects = action.payload;
        state.error = "";
      })
      .addCase(fetchFeatureProjects.rejected, (state, action) => {
        state.loadingFeatureProjects = false;
        state.featureProjects = [];
        state.error = action.error.message;
      })
      ///////////////New Launch/////////////////
      .addCase(fetchNewLaunchProjects.pending, (state) => {
        state.loadingNewLaunch = true;
      })
      .addCase(fetchNewLaunchProjects.fulfilled, (state, action) => {
        state.loadingNewLaunch = false;
        state.newLaunch = action.payload;
        state.error = "";
      })
      .addCase(fetchNewLaunchProjects.rejected, (state, action) => {
        state.loadingNewLaunch = false;
        state.newLaunch = [];
        state.error = action.error.message;
      })
      ///////////////Ready Projects/////////////////
      .addCase(fetchReadyProjects.pending, (state) => {
        state.loadingReadyMove = true;
      })
      .addCase(fetchReadyProjects.fulfilled, (state, action) => {
        state.loadingReadyMove = false;
        state.readyMove = action.payload;
        state.error = "";
      })
      .addCase(fetchReadyProjects.rejected, (state, action) => {
        state.loadingReadyMove = false;
        state.readyMove = [];
        state.error = action.error.message;
      })
      ///////////////Under Construction/////////////////
      .addCase(fetchUnderConstructionProjects.pending, (state) => {
        state.loadingUnderConstruction = true;
      })
      .addCase(fetchUnderConstructionProjects.fulfilled, (state, action) => {
        state.loadingUnderConstruction = false;
        state.underConstructionProjects = action.payload;
        state.error = "";
      })
      .addCase(fetchUnderConstructionProjects.rejected, (state, action) => {
        state.loadingUnderConstruction = false;
        state.underConstructionProjects = [];
        state.error = action.error.message;
      })
      ///////////////Add project/////////////////
      .addCase(addProject.pending, (state) => {
        state.addingProject = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.addingProject = false;
        // Handle any specific state changes after successful project addition
      })
      .addCase(addProject.rejected, (state, action) => {
        state.addingProject = false;
        // Handle any specific state changes after failed project addition
      })
      .addCase(updateProject.pending, (state) => {
        state.updatingProject = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updatingProject = false;
        // Handle any specific state changes after successful project update
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updatingProject = false;
        // Handle any specific state changes after failed project update
      })
      .addCase(deleteProject.pending, (state) => {
        state.deletingProject = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deletingProject = false;
        // Handle any specific state changes after successful project deletion
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deletingProject = false;
        // Handle any specific state changes after failed project deletion
      });
  },
});

export const { updatePropertyState } = propertySlice.actions;

export default propertySlice.reducer;
