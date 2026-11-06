package com.epsm.dto;

import java.util.List;

public class analyticsdto {

    // 1. executive platform kpi summary response
    public static class SummaryRes {
        private int totalProjects;
        private int activeProjects;
        private int totalTasks;
        private int completedTasks;
        private double taskCompletionRate;
        private int totalStoryPoints;
        private int completedStoryPoints;
        private int openTickets;
        private int criticalTickets;
        private double slaComplianceRate;
        private int pendingApprovals;
        private double teamBurnoutIndex;

        public SummaryRes() {}

        public SummaryRes(
                int totalProjects,
                int activeProjects,
                int totalTasks,
                int completedTasks,
                double taskCompletionRate,
                int totalStoryPoints,
                int completedStoryPoints,
                int openTickets,
                int criticalTickets,
                double slaComplianceRate,
                int pendingApprovals,
                double teamBurnoutIndex
        ) {
            this.totalProjects = totalProjects;
            this.activeProjects = activeProjects;
            this.totalTasks = totalTasks;
            this.completedTasks = completedTasks;
            this.taskCompletionRate = taskCompletionRate;
            this.totalStoryPoints = totalStoryPoints;
            this.completedStoryPoints = completedStoryPoints;
            this.openTickets = openTickets;
            this.criticalTickets = criticalTickets;
            this.slaComplianceRate = slaComplianceRate;
            this.pendingApprovals = pendingApprovals;
            this.teamBurnoutIndex = teamBurnoutIndex;
        }

        public int getTotalProjects() { return totalProjects; }
        public void setTotalProjects(int totalProjects) { this.totalProjects = totalProjects; }

        public int getActiveProjects() { return activeProjects; }
        public void setActiveProjects(int activeProjects) { this.activeProjects = activeProjects; }

        public int getTotalTasks() { return totalTasks; }
        public void setTotalTasks(int totalTasks) { this.totalTasks = totalTasks; }

        public int getCompletedTasks() { return completedTasks; }
        public void setCompletedTasks(int completedTasks) { this.completedTasks = completedTasks; }

        public double getTaskCompletionRate() { return taskCompletionRate; }
        public void setTaskCompletionRate(double taskCompletionRate) { this.taskCompletionRate = taskCompletionRate; }

        public int getTotalStoryPoints() { return totalStoryPoints; }
        public void setTotalStoryPoints(int totalStoryPoints) { this.totalStoryPoints = totalStoryPoints; }

        public int getCompletedStoryPoints() { return completedStoryPoints; }
        public void setCompletedStoryPoints(int completedStoryPoints) { this.completedStoryPoints = completedStoryPoints; }

        public int getOpenTickets() { return openTickets; }
        public void setOpenTickets(int openTickets) { this.openTickets = openTickets; }

        public int getCriticalTickets() { return criticalTickets; }
        public void setCriticalTickets(int criticalTickets) { this.criticalTickets = criticalTickets; }

        public double getSlaComplianceRate() { return slaComplianceRate; }
        public void setSlaComplianceRate(double slaComplianceRate) { this.slaComplianceRate = slaComplianceRate; }

        public int getPendingApprovals() { return pendingApprovals; }
        public void setPendingApprovals(int pendingApprovals) { this.pendingApprovals = pendingApprovals; }

        public double getTeamBurnoutIndex() { return teamBurnoutIndex; }
        public void setTeamBurnoutIndex(double teamBurnoutIndex) { this.teamBurnoutIndex = teamBurnoutIndex; }
    }

    // 2. sprint velocity tracking item
    public static class VelocityItem {
        private String sprint;
        private int points;
        private int target;

        public VelocityItem() {}

        public VelocityItem(String sprint, int points, int target) {
            this.sprint = sprint;
            this.points = points;
            this.target = target;
        }

        public String getSprint() { return sprint; }
        public void setSprint(String sprint) { this.sprint = sprint; }

        public int getPoints() { return points; }
        public void setPoints(int points) { this.points = points; }

        public int getTarget() { return target; }
        public void setTarget(int target) { this.target = target; }
    }

    // 3. velocity collection wrapper
    public static class VelocityRes {
        private List<VelocityItem> sprints;
        private double averageVelocity;

        public VelocityRes() {}

        public VelocityRes(List<VelocityItem> sprints, double averageVelocity) {
            this.sprints = sprints;
            this.averageVelocity = averageVelocity;
        }

        public List<VelocityItem> getSprints() { return sprints; }
        public void setSprints(List<VelocityItem> sprints) { this.sprints = sprints; }

        public double getAverageVelocity() { return averageVelocity; }
        public void setAverageVelocity(double averageVelocity) { this.averageVelocity = averageVelocity; }
    }
}
