export const enum CommandStatus {
        CREATED = 0,
        PENDING = 1,
        CONFIRMED = 2,
        INPROGRESS = 3,
        COMPLETED = 4,
        CANCELLED = -1
};

export const CommandStatusNames : Record<CommandStatus, string> = {
        [CommandStatus.CREATED]: 'Đã tạo',
        [CommandStatus.PENDING]: 'Đang chờ xác nhận',
        [CommandStatus.CONFIRMED]: 'Đã xác nhận',
        [CommandStatus.INPROGRESS]: 'Đang sản xuất',
        [CommandStatus.COMPLETED]: 'Đã hoàn thành',
        [CommandStatus.CANCELLED]: 'Đã hủy'
};

export const CommandStatusList = [
    { name: 'Dã tạo', id: CommandStatus.CREATED },
    { name: 'Đang chờ xác nhận', id: CommandStatus.PENDING },
    { name: 'Đã xác nhận', id: CommandStatus.CONFIRMED },
    { name: 'Đang sản xuất', id: CommandStatus.INPROGRESS },
    { name: 'Đã hoàn thành', id: CommandStatus.COMPLETED },
    { name: 'Đã hủy', id: CommandStatus.CANCELLED }
];