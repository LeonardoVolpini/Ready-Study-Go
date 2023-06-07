'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('RSG.db', (err) => {
  if (err) {
    throw err;
  }
});

/////////
//USERS//
/////////
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined) {
        const error = {
          message: 'User not found.'
        };
        resolve({ error });
      }
      else {
        const user = {
          id: row.id,
          username: row.username,
          name: row.name,
          surname: row.surname,
          email: row.email,
          song: row.song ? row.song : undefined
        };
        resolve(user);
      }
    });
  });
};

exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE username = ? and password = ?';
    db.get(sql, [username, password], (err, row) => {
      if (err) { reject(err); }
      else if (row === undefined) { resolve(false); }
      else {
        const user = {
          id: row.id,
          username: row.username,
          name: row.name,
          surname: row.surname,
          email: row.email,
          song: row.song ? row.song : undefined
        };
        resolve(user);
      }
    });
  });
};


/////////
//SESSIONS//
/////////
exports.getSessionsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM session WHERE user_id = ?';
    db.all(query, [userId], (err, rows) => {
      if (err) {
        reject(err);
      }
      const sessions = rows.map((s) => (
        {
          id: s.id,
          name: s.name,
          date: s.date,
          startTime: s.start_time,
          endTime: s.end_time,
          breakDuration: s.break_duration,
          studyDuration: s.study_duration,
          userId: s.user_id,
          planId: s.plan_id ? s.plan_id : undefined,
          taskId: s.task_id,
          appList: s.app_list ? s.app_list : undefined,
          notificationList: s.notification_list ? s.notification_list : undefined
        }));
      resolve(sessions);
    });
  });
};

exports.getSessionsByUserIdAndDate = (userId, date) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM session WHERE user_id = ? AND date = ?';
    db.all(query, [userId, date], (err, rows) => {
      if (err) {
        reject(err);
      }
      const sessions = rows.map((s) => (
        {
          id: s.id,
          name: s.name,
          date: s.date,
          startTime: s.start_time,
          endTime: s.end_time,
          breakDuration: s.break_duration,
          studyDuration: s.study_duration,
          userId: s.user_id,
          planId: s.plan_id ? s.plan_id : undefined,
          taskId: s.task_id,
          appList: s.app_list ? s.app_list : undefined,
          notificationList: s.notification_list ? s.notification_list : undefined
        }));
      resolve(sessions);
    });
  });
};

exports.getSessionById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM session WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined) {
        const error = {
          message: 'Session not found.'
        };
        resolve({ error });
      }
      else {
        const session = {
          id: row.id,
          name: row.name,
          date: row.date,
          startTime: row.start_time,
          endTime: row.end_time,
          breakDuration: row.break_duration,
          studyDuration: row.study_duration,
          userId: row.user_id,
          planId: row.plan_id ? row.plan_id : undefined,
          taskId: row.task_id,
          appList: row.app_list ? row.app_list : undefined,
          notificationList: row.notification_list ? row.notification_list : undefined
        }
        resolve(session);
      }
    });
  });
};

exports.deleteSession = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM session WHERE id = ?';
    db.run(query, id, (err) => {
      if (err) {
        reject(err);
      } else
        resolve(true);
    });
  });
};

exports.updateSession = (session) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE session SET name=?, date=?, start_time = ?, end_time = ?, break_duration=?, study_duration=?, plan_id = ?,  task_id= ?, app_list=?, notification_list=? WHERE id = ?";
    const parameters = [
      session.name,
      session.date,
      session.startTime,
      session.endTime,
      session.breakDuration,
      session.studyDuration,
      session.planId,
      session.taskId,
      session.appList,
      session.notificationList,
      session.id
    ];
    db.run(query, parameters, function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) reject("operation failed");
      resolve(this.lastID);
    });
  });
};

exports.createSession = (session) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO session (name, date, start_time, end_time, break_duration, study_duration, user_id, plan_id, task_id, app_list, notification_list) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    const parameters = [
      session.name,
      session.date,
      session.startTime,
      session.endTime,
      session.breakDuration,
      session.studyDuration,
      session.userId,
      session.planId,
      session.taskId,
      session.appList,
      session.notificationList
    ];
    db.run(query, parameters, function (err) {
      // <-- NB: function, NOT arrow function
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) reject("operation failed");
      resolve(this.lastID);
    });
  });
};

/////////
//PLANS//
/////////

exports.getPlanById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM plan WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined) {
        const error = {
          message: 'Plan not found.'
        };
        resolve({ error });
      }
      else {
        const plan = {
          id: row.id,
          name: row.name,
          breakDuration: row.break_duration,
          studyDuration: row.study_duration,
          appList: row.app_list,
          notificationList: row.notification_list,
          userId: row.user_id ? row.user_id : undefined //undefined = piano di default
        };
        resolve(plan);
      }
    });
  });
};

exports.getPlansByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM plan WHERE user_id = ?';
    db.all(query, [userId], (err, rows) => {
      if (err) {
        reject(err);
      }
      const plans = rows.map((p) => (
        {
          id: p.id,
          name: p.name,
          breakDuration: p.break_duration,
          studyDuration: p.study_duration,
          appList: p.app_list,
          notificationList: p.notification_list,
          userId: p.user_id ? p.user_id : undefined //undefined = piano di default
        }));
      resolve(plans);
    });
  });
};


exports.getDefaultPlans = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM plan WHERE user_id is NULL';
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      }
      const plans = rows.map((p) => (
        {
          id: p.id,
          name: p.name,
          breakDuration: p.break_duration,
          studyDuration: p.study_duration,
          appList: p.app_list,
          notificationList: p.notification_list,
          userId: undefined //undefined = piano di default
        }));
      resolve(plans);
    });
  });
};

exports.deletePlan = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM plan WHERE id = ?';
    db.run(query, id, (err) => {
      if (err) {
        reject(err);
      } else
        resolve(true);
    });
  });
};

exports.updatePlan = (plan) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE plan SET name=?, break_duration=?, study_duration=?, app_list=?, notification_list=?, user_id=? WHERE id = ?";
    const parameters = [
      plan.name,
      plan.breakDuration,
      plan.studyDuration,
      plan.appList,
      plan.notificationList,
      plan.userId,
      plan.id
    ];
    db.run(query, parameters, function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) reject("operation failed");
      resolve(this.lastID);
    });
  });
};

exports.createPlan = (plan) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO plan (name, break_duration, study_duration, app_list, notification_list, user_id) VALUES(?,?,?,?,?,?)";
    const parameters = [
      plan.name,
      plan.breakDuration,
      plan.studyDuration,
      plan.appList,
      plan.notificationList,
      plan.userId
    ];
    db.run(query, parameters, function (err) {
      // <-- NB: function, NOT arrow function
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) reject("operation failed");
      resolve(this.lastID);
    });
  });
};

exports.updateSong = (song) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE user SET song=? WHERE id = 1";
    db.run(query, song, function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) reject("operation failed");
      resolve(this.lastID);
    });
  });
};