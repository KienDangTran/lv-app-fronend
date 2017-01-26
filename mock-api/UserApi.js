const users = [
  {
    userId               : "U0000001",
    username             : "employee1",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000002",
    username             : "employee2",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000003",
    username             : "employee3",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000004",
    username             : "employee4",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000005",
    username             : "employee5",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000006",
    username             : "employee6",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000007",
    username             : "employee7",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000008",
    username             : "employee8",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U0000009",
    username             : "employee9",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000010",
    username             : "employee10",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000011",
    username             : "employee11",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000012",
    username             : "employee12",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000013",
    username             : "employee13",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000014",
    username             : "employee14",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000015",
    username             : "employee15",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000016",
    username             : "employee16",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000017",
    username             : "employee17",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000018",
    username             : "employee18",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000019",
    username             : "employee19",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000020",
    username             : "employee20",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000021",
    username             : "employee21",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000022",
    username             : "employee22",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000023",
    username             : "employee23",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000024",
    username             : "employee24",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000025",
    username             : "employee25",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000026",
    username             : "employee26",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
  {
    userId               : "U00000027",
    username             : "employee27",
    accNonExpired        : true,
    accNonLocked         : true,
    credentialsNonExpired: true,
    enabled              : true
  },
];

class UserApi {
  static fetchUsers(pageNo = 1, pageSize = 10) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (pageNo === 3 && pageSize === 5) {
              reject(
                {
                  message: "Not found",
                  status : 404
                }
              );
            }

            if (pageNo === 4 && pageSize === 5) {
              reject(
                {
                  message: "Request time out",
                  status : 500
                }
              );
            }

            resolve(users.slice((pageNo - 1) * pageSize, pageSize * pageNo));
          },
          Math.random() * 2000 + 1000
        );
      }
    );
  }

  static countUsers() {
    return new Promise(
      (resolve) => {
        setTimeout(
          () => {
            resolve(users.length);
          }
        )
      },
      Math.random() * 2000 + 1000
    );
  }
}

export default UserApi;
