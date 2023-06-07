const URL = '/api/';

/////////
//SESSIONS//
/////////
async function getSessionsByUserId(user_id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'session/' + user_id)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

async function getSessionById(id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'sessions/' + id)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

async function getSessionsByUserIdAndDate(user_id, date) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'session/' + user_id + "/date/" + date)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

function deleteSession(id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'session/' + id, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateSession(session) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'session', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function createSession(session) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session }),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((obj) => { reject(obj) }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

/////////
//PLANS//
/////////
async function getPlansByUserId(user_id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'plan/' + user_id)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

async function getPlanById(id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'plans/' + id)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

async function getDefaultPlans() {
  return new Promise((resolve, reject) => {
    fetch(URL + 'default-plan')
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

function deletePlan(id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'plan/' + id, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updatePlan(plan) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'plan', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function createPlan(plan) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    }).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

/////////
//USERS//
/////////
async function getUserById(user_id) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'user/' + user_id)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

async function login(username, password) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          response.json()
            .then((obj) => { reject(obj); })
            .catch(() => { reject({ error: "Cannot parse server response." }) });
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
};

function updateSong(song) {
  return new Promise((resolve, reject) => {
    fetch(URL + 'song', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ song }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}


//EXPORT FUNCTIONS
const API = {
  getSessionsByUserId, getSessionsByUserIdAndDate, deleteSession, updateSession, createSession,
  getPlansByUserId, getDefaultPlans, deletePlan, updatePlan, createPlan, getUserById, login, updateSong,
  getPlanById, getSessionById
}

export default API;