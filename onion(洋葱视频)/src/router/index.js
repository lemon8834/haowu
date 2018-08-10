import Vue from 'vue'
import Router from 'vue-router'

const Invitation = (resolve) => {
  import('components/invitation/invitation').then((module) => {
    resolve(module)
  })
}

const ActivityList = (resolve) => {
  import('components/invitation/activity-list').then((module) => {
    resolve(module)
  })
}

const Share = (resolve) => {
  import('components/share/share').then((module) => {
    resolve(module)
  })
}

const Awaken = (resolve) => {
  import('components/awaken/awaken').then((module) => {
    resolve(module)
  })
}

const Skill = (resolve) => {
  import('components/skill/skill').then((module) => {
    resolve(module)
  })
}

const InviteShare = (resolve) => {
  import('components/invite-share/invite-share').then((module) => {
    resolve(module)
  })
}

const Detailed = (resolve) => {
  import('components/detailed/detailed').then((module) => {
    resolve(module)
  })
}

const Questions = (resolve) => {
  import('components/questions/questions').then((module) => {
    resolve(module)
  })
}

const HowToMakeMoney = (resolve) => {
  import('components/questions/how-to-make-money').then((module) => {
    resolve(module)
  })
}

const HowAcceptApprentice = (resolve) => {
  import('components/questions/how-accept-apprentice').then((module) => {
    resolve(module)
  })
}

const HowRegister = (resolve) => {
  import('components/questions/how-register').then((module) => {
    resolve(module)
  })
}

const HowInstall = (resolve) => {
  import('components/questions/how-install').then((module) => {
    resolve(module)
  })
}

const HowInviteCode = (resolve) => {
  import('components/questions/how-invite-code').then((module) => {
    resolve(module)
  })
}

const HowBindWechat = (resolve) => {
  import('components/questions/how-bind-wechat').then((module) => {
    resolve(module)
  })
}

const HowMass = (resolve) => {
  import('components/questions/how-mass').then((module) => {
    resolve(module)
  })
}

const VideoCourse = (resolve) => {
  import('components/questions/video-course').then((module) => {
    resolve(module)
  })
}

const Agreement = (resolve) => {
  import('components/service-agreement/service-agreement').then((module) => {
    resolve(module)
  })
}

const DiamondIntro = (resolve) => {
  import('components/diamond-intro/diamond-intro').then((module) => {
    resolve(module)
  })
}

const Download = (resolve) => {
  import('components/download/download').then((module) => {
    resolve(module)
  })
}

const DiamondDetail = (resolve) => {
  import('components/diamond-detail/diamond-detail').then((module) => {
    resolve(module)
  })
}

const Wxpage = (resolve) => {
  import('components/weixin/wxpage').then((module) => {
    resolve(module)
  })
}

const RedPacketShare = (resolve) => {
  import('components/redPacket-share/redPacket-share').then((module) => {
    resolve(module)
  })
}

const Rules = (resolve) => {
  import('components/rules/rules').then((module) => {
    resolve(module)
  })
}

const Authorize = (resolve) => {
  import('components/authorize/authorize').then((module) => {
    resolve(module)
  })
}

const BaskIncome = (resolve) => {
  import('components/bask-income/bask-income').then((module) => {
    resolve(module)
  })
}

const MassInvited = (resolve) => {
  import('components/mass-invited/mass-invited').then((module) => {
    resolve(module)
  })
}

const SmsLink = (resolve) => {
  import('base/sms-link/sms-link').then((module) => {
    resolve(module)
  })
}

const MakeMoney = (resolve) => {
  import('components/make-money/make-money').then((module) => {
    resolve(module)
  })
}

const VideoDetail = (resolve) => {
  import('components/questions/video-detail').then((module) => {
    resolve(module)
  })
}

const RedEnvelopesShare = (resolve) => {
  import('components/red-envelopes/red-envelopes-share').then((module) => {
    resolve(module)
  })
}

const RedEnvelopes = (resolve) => {
  import('components/red-envelopes/red-envelopes').then((module) => {
    resolve(module)
  })
}

const ActivityEntry = (resolve) => {
  import('components/activity-entry/activity-entry').then((module) => {
    resolve(module)
  })
}

const InviteCodeDetail = (resolve) => {
  import('components/invite-code-detail/invite-code-detail').then((module) => {
    resolve(module)
  })
}

const CashActivity = (resolve) => {
  import('components/cash-activity/cash-activity').then((module) => {
    resolve(module)
  })
}

const InviteList = (resolve) => {
  import('components/cash-activity/invite-list').then((module) => {
    resolve(module)
  })
}

const Questions1 = (resolve) => {
  import('components/questions/questions1').then((module) => {
    resolve(module)
  })
}

const Questions2 = (resolve) => {
  import('components/questions/questions2').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/invitation',
      name: 'invitation',
      component: Invitation,
      children: [
        {
          path: 'child',
          name: 'activityNew',
          component: ActivityList
        }
      ]
    },
    {
      path: '/share',
      component: Share
    },
    {
      path: '/awaken',
      component: Awaken
    },
    {
      path: '/skill',
      component: Skill
    },
    {
      path: '/inviteShare',
      component: InviteShare
    },
    {
      path: '/detailed',
      component: Detailed
    },
    {
      path: '/questions',
      component: Questions,
      children: [
        {
          path: '1',
          component: HowToMakeMoney
        },
        {
          path: '2',
          component: HowAcceptApprentice
        },
        {
          path: '3',
          component: HowRegister
        },
        {
          path: '4',
          component: HowInstall
        },
        {
          path: '5',
          component: HowInviteCode
        },
        {
          path: '6',
          component: HowMass
        },
        {
          path: '7',
          component: HowBindWechat
        },
        {
          path: '8',
          component: Questions1
        },
        {
          path: '9',
          component: Questions2
        },
        {
          path: 'videoCourse',
          component: VideoCourse
        },
        {
          path: 'videoDetail',
          component: VideoDetail
        }
      ]
    },
    {
      path: '/agreement',
      component: Agreement
    },
    {
      path: '/diamondIntro',
      name: 'diamondIntro',
      component: DiamondIntro
    },
    {
      path: '/download',
      component: Download
    },
    {
      path: '/diamondDetail',
      component: DiamondDetail
    },
    {
      path: '/wxpage',
      component: Wxpage
    },
    {
      path: '/rpShare',
      component: RedPacketShare
    },
    {
      path: '/rules',
      component: Rules
    },
    {
      path: '/authorize',
      component: Authorize
    },
    {
      path: '/incomeShare',
      component: BaskIncome
    },
    {
      path: '/massInvited',
      component: MassInvited
    },
    {
      path: '/smslink',
      component: SmsLink
    },
    {
      path: '/makeMoney',
      component: MakeMoney
    },
    {
      path: '/reshare',
      component: RedEnvelopesShare
    },
    {
      path: '/redenvelopes',
      component: RedEnvelopes 
    },
    {
      path: '/activityEntry',
      component: ActivityEntry
    },
    {
      path: '/inviteCD',
      component: InviteCodeDetail
    },
    {
      path: '/cashActivity',
      component: CashActivity,
      children: [
        {
          path: '1',
          name: 'inviteList',
          component: InviteList
        }
      ]
    }
  ]
})
