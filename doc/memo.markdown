### start & stop server

```ruby
ps aux | grep unicorn | grep -v grep | awk '{print $2}' | xargs kill -9

bundle exec unicorn_rails -c config/unicorn.rb -D -E production
```

### sync project and repository

```ruby
Project.all.each{|p| Repository.find_by_name(p.name).update_column('project_id', p.id)}
```

### 工会的核心流程

工会的主要工作流是，领任务，做任务，完成任务。跟踪，和激励作用吧


### 相关的考虑

弱化commit在经验值和积分中的比重。或者，只是一个纬度。

当然，成员还要有经验值，工会有总经验值，代表工会成长情况，经验值反正要调整，有个积分就可以，所以，两个页面，1个，成员list，有任务完成情况，成员状态（新人，初级，高级），参与任务， 2. 项目list，项目名，项目状态，参与成员。当然，成员要可以登录了

### 一些相关疑问

工会系统的核心价值在哪？

职业工会能够存活下来，最主要的依靠是什么？

职业工会可以给成员带来什么？

职业工会可以给核心开发团队带来什么？

### 如何在快速小迭代里发挥核心团队的协作能力

主要的功能在哪？

这次小迭代的目标是什么？

估计，应该是强行上线，让职业工会可以发展壮大吧

