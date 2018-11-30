create database if not exists piastmpk;

create table if not exists piastmpk.stops (
  id int not null auto_increment primary key,
  nazwa varchar(50) not null,
  lattitude float not null,
  longtitude float not null
);

create table if not exists piastmpk.lines (
  id int not null primary key,
  typ enum("bus", "tram") not null
);

create table if not exists piastmpk.stopline (
  id int not null auto_increment primary key,
  line_id int not null,
  stop_id int not null,
  ord int not null,
  direction bool,
  constraint `line_key`
    foreign key (line_id) references piastmpk.lines (id)
    on delete cascade
    on update restrict,
  constraint `stop_key`
    foreign key (stop_id) references piastmpk.stops (id)
    on delete cascade
    on update restrict
);

create table if not exists piastmpk.accidents (
  id int not null auto_increment primary key,
  stopline int not null,
  rate int,
  time datetime,
  user_id int not null,
  description varchar(255) not null,
  constraint `stopline_key`
    foreign key (stopline) references piastmpk.stopline (id)
    on delete cascade
    on update restrict
);
create table if not exists piastmpk.inspection (
  id int not null auto_increment primary key,
  stopline int not null,
  rate int,
  time datetime,
  user_id int not null,
  constraint `stopline_fkey`
    foreign key (stopline) references piastmpk.stopline (id)
    on delete cascade
    on update restrict
);


