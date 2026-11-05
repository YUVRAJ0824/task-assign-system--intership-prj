package com.epsm.dto;

import java.util.List;

// 1. workload capacity data transfer objects
public class workloaddto {

    // 2. response dto - engineering team capacity metrics
    public static class Res {
        private String name;
        private String role;
        private String team;
        private String mentor;
        private Integer activePoints;
        private Integer completedPoints;
        private Integer allocatedHours;
        private Integer maxHours;
        private Integer percent;
        private String status;
        private List<TaskSummary> tasks;

        public Res() {}

        public Res(String name, String role, String team, String mentor, Integer activePoints, Integer completedPoints, Integer allocatedHours, Integer maxHours, Integer percent, String status, List<TaskSummary> tasks) {
            this.name = name;
            this.role = role;
            this.team = team;
            this.mentor = mentor;
            this.activePoints = activePoints;
            this.completedPoints = completedPoints;
            this.allocatedHours = allocatedHours;
            this.maxHours = maxHours;
            this.percent = percent;
            this.status = status;
            this.tasks = tasks;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getTeam() { return team; }
        public void setTeam(String team) { this.team = team; }

        public String getMentor() { return mentor; }
        public void setMentor(String mentor) { this.mentor = mentor; }

        public Integer getActivePoints() { return activePoints; }
        public void setActivePoints(Integer activePoints) { this.activePoints = activePoints; }

        public Integer getCompletedPoints() { return completedPoints; }
        public void setCompletedPoints(Integer completedPoints) { this.completedPoints = completedPoints; }

        public Integer getAllocatedHours() { return allocatedHours; }
        public void setAllocatedHours(Integer allocatedHours) { this.allocatedHours = allocatedHours; }

        public Integer getMaxHours() { return maxHours; }
        public void setMaxHours(Integer maxHours) { this.maxHours = maxHours; }

        public Integer getPercent() { return percent; }
        public void setPercent(Integer percent) { this.percent = percent; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public List<TaskSummary> getTasks() { return tasks; }
        public void setTasks(List<TaskSummary> tasks) { this.tasks = tasks; }
    }

    // 3. compact task summary inside workload
    public static class TaskSummary {
        private String code;
        private String title;
        private Integer points;
        private String status;

        public TaskSummary() {}

        public TaskSummary(String code, String title, Integer points, String status) {
            this.code = code;
            this.title = title;
            this.points = points;
            this.status = status;
        }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public Integer getPoints() { return points; }
        public void setPoints(Integer points) { this.points = points; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
