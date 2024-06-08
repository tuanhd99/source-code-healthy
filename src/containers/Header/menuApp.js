export const adminMenu = [
  {
    //quan li nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      // {
      //   name: "menu.doctor.manage-patient",
      //   link: "/doctor/manage-patient",
      // },
      {
        name: "menu.admin.manage-all-users",
        link: "/system/manage-all-users",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        //quan li kế hoạch khám bệnh của bác sĩ

        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quan li phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quan li chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quan li cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      //quan li kế hoạch khám bệnh của bác si
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //quan li quan li benh nhan khám bệnh của bác si
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
    ],
  },
];
