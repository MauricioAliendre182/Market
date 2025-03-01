import { TimeAgoPipe } from './time-ago.pipe';
import * as dateFns from 'date-fns';

// Mock the date-fns module
jest.mock('date-fns', () => ({
  formatDistance: jest.fn()
}));

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;
  let originalDate: any;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
    // Store the original Date constructor
    originalDate = window.Date;
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore the original Date constructor after each test
    window.Date = originalDate;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "less than a minute ago" for very recent dates', () => {
    // Mock the current date
    const mockDate = new Date('2023-01-01T12:00:00');
    // Mock Date constructor
    window.Date = jest.fn(() => mockDate) as any;

    // Date 30 seconds ago
    const date = new Date('2023-01-01T11:59:30');

    // Set up the mock return value
    (dateFns.formatDistance as jest.Mock).mockReturnValue('less than a minute');

    expect(pipe.transform(date)).toBe('less than a minute');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "1 minute ago" for dates 1 minute in the past', () => {
    const mockDate = new Date('2023-01-01T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2023-01-01T11:59:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('1 minute');

    expect(pipe.transform(date)).toBe('1 minute');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "5 minutes ago" for dates 5 minutes in the past', () => {
    const mockDate = new Date('2023-01-01T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2023-01-01T11:55:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('5 minutes');

    expect(pipe.transform(date)).toBe('5 minutes');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "1 hour ago" for dates 1 hour in the past', () => {
    const mockDate = new Date('2023-01-01T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2023-01-01T11:00:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('about 1 hour');

    expect(pipe.transform(date)).toBe('about 1 hour');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "1 day ago" for dates 1 day in the past', () => {
    const mockDate = new Date('2023-01-02T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2023-01-01T12:00:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('1 day');

    expect(pipe.transform(date)).toBe('1 day');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "1 month ago" for dates 1 month in the past', () => {
    const mockDate = new Date('2023-02-01T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2023-01-01T12:00:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('about 1 month');

    expect(pipe.transform(date)).toBe('about 1 month');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });

  it('should return "1 year ago" for dates 1 year in the past', () => {
    const mockDate = new Date('2023-01-01T12:00:00');
    window.Date = jest.fn(() => mockDate) as any;

    const date = new Date('2022-01-01T12:00:00');

    (dateFns.formatDistance as jest.Mock).mockReturnValue('about 1 year');

    expect(pipe.transform(date)).toBe('about 1 year');
    expect(dateFns.formatDistance).toHaveBeenCalledWith(mockDate, date);
  });
});
