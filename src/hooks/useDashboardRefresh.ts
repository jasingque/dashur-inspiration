import { useState, useCallback } from 'react';

type DashboardRefreshEvent = 'refresh-activity' | 'refresh-stats' | 'refresh-all';

const eventListeners = new Map<DashboardRefreshEvent, Set<() => void>>();

export const useDashboardEvent = () => {
  const subscribe = useCallback((event: DashboardRefreshEvent, callback: () => void) => {
    if (!eventListeners.has(event)) {
      eventListeners.set(event, new Set());
    }
    eventListeners.get(event)!.add(callback);
    
    return () => {
      eventListeners.get(event)?.delete(callback);
    };
  }, []);

  const emit = useCallback((event: DashboardRefreshEvent) => {
    const listeners = eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback());
    }
  }, []);

  return { subscribe, emit };
};

export const useDashboardRefresh = (onRefresh?: () => void) => {
  const { subscribe } = useDashboardEvent();
  
  const refreshActivity = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  useState(() => {
    const unsubscribe = subscribe('refresh-activity', refreshActivity);
    return unsubscribe;
  });

  return { refreshActivity };
};

export const useDashboardTrigger = () => {
  const { emit } = useDashboardEvent();
  
  const triggerActivityRefresh = useCallback(() => {
    emit('refresh-activity');
  }, [emit]);

  const triggerStatsRefresh = useCallback(() => {
    emit('refresh-stats');
  }, [emit]);

  const triggerAllRefresh = useCallback(() => {
    emit('refresh-all');
  }, [emit]);

  return {
    triggerActivityRefresh,
    triggerStatsRefresh,
    triggerAllRefresh
  };
};
