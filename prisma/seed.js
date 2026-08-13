"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
async function main() {
    const countries = [
        { countryCode: 'IN', countryName: 'India', status: 'Active' },
        { countryCode: 'US', countryName: 'United States', status: 'Active' },
        { countryCode: 'UK', countryName: 'United Kingdom', status: 'Suspend' },
    ];
    for (const c of countries) {
        await prisma.country.upsert({
            where: { countryCode: c.countryCode },
            update: {},
            create: c,
        });
    }
    const teams = [
        { teamName: 'Development', teamCode: 'DEV', status: 'Active' },
        { teamName: 'Testing', teamCode: 'TEST', status: 'Active' },
        { teamName: 'Support', teamCode: 'SUPP', status: 'Suspend' },
    ];
    for (const t of teams) {
        await prisma.team.upsert({
            where: { teamCode: t.teamCode },
            update: {},
            create: t,
        });
    }
    const clients = [
        { clientName: 'Acme Corp', clientCode: 'ACME', country: 'India', email: 'contact@acme.com', status: 'Active' },
        { clientName: 'Globex Ltd', clientCode: 'GLBX', country: 'United States', email: 'info@globex.com', status: 'Active' },
        { clientName: 'Initech', clientCode: 'INTC', country: 'United Kingdom', email: 'hello@initech.com', status: 'Suspend' },
    ];
    for (const c of clients) {
        await prisma.client.upsert({
            where: { clientCode: c.clientCode },
            update: {},
            create: c,
        });
    }
    const users = [
        { username: 'harini', email: 'harini@blufin.com', team: 'Development', status: 'Active', password: 'Harini@123' },
        { username: 'arjun.k', email: 'arjun.k@blufin.com', team: 'Testing', status: 'Active', password: 'Arjun@123' },
        { username: 'admin', email: 'admin@blufin.com', team: 'Support', status: 'Active', password: 'Admin@123' },
    ];
    for (const u of users) {
        const existing = await prisma.user.findUnique({ where: { username: u.username } });
        if (!existing) {
            await prisma.user.create({
                data: { ...u, password: await bcrypt.hash(u.password, 10) },
            });
        }
    }
    const tickets = [
        {
            ticketNo: 'TKT-001',
            client: 'Acme Corp',
            ticketDate: '2026-07-16',
            deliveryDate: '2026-07-20',
            team: 'Development',
            requestedBy: 'Harini',
            assignTo: 'Arjun',
            sprint: 'Sprint-1',
            ticketStatus: 'Open',
            description: 'Login Issue',
            owner: 'Harini',
            ownerHrs: 5,
            developer: 'Arjun',
            developerHrs: 10,
            tester: 'Priya',
            testerHrs: 3,
        },
    ];
    for (const t of tickets) {
        const existing = await prisma.ticket.findUnique({ where: { ticketNo: t.ticketNo } });
        if (!existing) {
            await prisma.ticket.create({ data: t });
        }
    }
    const updates = [
        {
            ticketNo: 'TKT-001',
            updateStatus: 'Development',
            assignTo: 'Arjun',
            assignedOn: '2026-07-17',
            hours: 5,
            comments: 'Login Page Completed',
        },
    ];
    for (const u of updates) {
        await prisma.ticketUpdate.create({ data: u });
    }
    console.log('Seed complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map